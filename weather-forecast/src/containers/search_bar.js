import React,{Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { fecthWeather} from '../actions/index'

export default class SearchBar extends Component{
    constructor(props){
        super(props)
        this.state = {term:''}
        this.onInputChange = this.onInputChange.bind(this)
        this.onFormSubmit = this.onFormSubmit.bind(this)
    }
    onInputChange(event){
        this.setState({term:event.target.value})
    }

    onFormSubmit(event){
        event.preventDefault()
        this.props.fecthWeather(this.state.term)
        this.setState({term:''})
    }
    render(){
        return (
            <form onSubmit={this.onFormSubmit} className="input-group">
                <input
                palceholder="Get a five day forecast in your favorite city"
                className="form-control"
                value={this.state.term}
                onChange={this.onInputChange}/>
                <span className="input-group-btn">
                    <button type="submit" className="btn btn-secondary" ></button>
                </span>
            </form>
        )
    }
}


function mapDispatchToProp(dispathc){
    return bindActionCreators({fecthWeather},dispatch)
}
export default connect(null,mapDispatchToProp)(SearchBar)