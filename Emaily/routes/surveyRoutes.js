const mongoose = require('mongoose')
const _ = require('lodash')
const Path = require('path-parser')
const {URL} = require('url')
const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')
const Mailer = require('../services/Mailer')
const Survey = mongoose.model('surveys')
const surveyTemplate = require('../services/emailTemplates/surveyTemplates')
module.exports = app =>{
    app.get('/api/surveys',requireLogin,(req,res)=>{
        const Surveys = Survey.find({
            _user:req.user.id
        })
        .select({
            recipients:false
        })
        .then(r=>{
                res.send(r)
            }
        )
    })
    app.get('/api/surveys/thanks',(req,res)=>{
        res.send('thanks for survey')
    })
    app.post('/api/surveys/webhooks',(req,res)=>{
        const p = new Path('/api/surveys/:surveyId/:choice')
        _.chain(req.body)
        .map(({email,url})=>{
            const pathname = new URL(url).pathname
            const match = p.test(pathname)
            if(match)
                return {
                    email: email,
                    surveyId:match.surveyId,
                    choice: match.choice
                }
        })
        .compact()
        .uniqBy('email','surveyId')
        .each(({email,choice,surveyId})=>{
            Survey.updateOne({
                _id:surveyId,
                recipients:{
                    $elemMatch:{
                        email: email,
                        responded:false
                    }
                }
            },{
                $inc: {[choice]:1},
                $set:{'recipients.$.responded':true}
            }).exec()
        })
        .value()
        res.send({})
    })

    app.post('./api/surveys',requireLogin,requireCredits,(req,res)=>{
       const {title,subject,body,recipients} = req.body
        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email => ({ email: email.trim() })), 
            _use:req.user.id,
            dateSent:Date.now()
        })
        const mailer = new Mailer(survey,surveyTemplat(survey))
        .then(res=>{
            mailer.send()
            .then(res=>{
                survey.save()
                .then(res=>{
                    req.user.credits -=1
                    req.user.save()
                    .then(user=>{
                        res.send(user)
                    })
                })
            })
        })
        
    })
}