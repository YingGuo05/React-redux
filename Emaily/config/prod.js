// module.exports={
//     googleClientId:'999255063202-vlu5b0acmhd8sbfdfkgm8pje21e5ee1e.apps.googleusercontent.com',
//     googleClientSecret:'96eswjgCkNmI1z9BuI4gzDTY',
//     mongoURI:'mongodb://heroku_84hz40zq:pdve8lr82ituavcrfm7lovjqsh@ds115396.mlab.com:15396/heroku_84hz40zq',
//     cookieKey:'sdfsfgdhrw'
// }
module.exports={
    googleClientId:process.env.GOOGLE_CLIENT_ID,
    googleClientSecret:process.env.GOOGLE_CLIENT_SECRET,
    mongoURI:process.env.MONGO_URI,
    cookieKey:process.env.COOKIE_KEY,
    stripePublishableKey:process.env.STRIPE_PUBLISHABLE_KEY,
    stripeSecretKey:process.env.STRIPE_SECRET_KEY,
    sendGridKey:process.env.SEND_GRID_KEY,
    redirectDomain:process.env.REDIRECT_DOMAIN
}
