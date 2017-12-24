import React,{Component} from 'react'
import { connect } from 'react-redux'
import {fetchSurveys} from '../../actions'
class SurveyList extends Component{
    componentDidMount(){
        this.props.fetchSurveys()
    }
    renderSurveys(){
        return this.props.survey.map(s=>{
            return(
                <div className="card darken-1" key={s._id}>
                    <div className="card-content">
                    <span className="card-title">
                        {s.title}
                    </span>
                    <p>
                        {s.body}
                    </p>
                    <p className="right">
                        Sent On: {new Date(s.dateSent()).toLocaleDateString()}
                    </p>
                    <div className="card-action">
                        <a>Yes:{s.yes}</a>
                        <a>No:{s.no}</a>
                    </div>
                    </div>
                </div>
            )
        })
    }
    render(){
        return(
            <div>
                {this.renderSurveys()}
            </div>
        )
    }
}

function mapStateToProps({survey}){
    return {survey}
}

export default connect(mapStateToProps,{fetchSurveys})(SurveyList)