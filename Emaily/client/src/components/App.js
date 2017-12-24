import React,{Component} from 'react'
import {BrowserRouter,Route} from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../actions'

import Header from './Header'
import Landing from './landing'
import Dashboard from './Dashboard'
import SurveyNew from './surveys/SurveyNew'


class  App extends Component {
    componentDidMount(){
        this.props.fetchUser()
    }
    render(){
        return(
            <div className="container">
                <BrowserRouter>
                        <div>
                            <Header/>
                            <Route exact={true} path="/" component={Landing}> </Route>
                            <Route exact={true} path="/surveys" component={Dashboard}> </Route>
                            <Route exact={true} path="/surveys/new" component={SurveyNew}> </Route>
                        </div>
                </BrowserRouter>
            </div>
        )
    }
}
export default connect(null,actions)(App)