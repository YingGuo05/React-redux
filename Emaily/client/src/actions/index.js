import axios from 'axios'
import { FETCH_USER,FETCH_SURVEYS } from './types'

export const fetchUser = () =>{
    return function(dispatch){
        axios.get('/api/current_user')
        .then(res=>{
            dispatch({
                type:FETCH_USER,
                payload:res.data
            })
        })
    }
}

export const handleToken = (token )=>{
    return function(dispatch){
        axios.post('/api/stripe')
        .then(res=>{
            dispatch({
                type:FETCH_USER,
                payload:res.data
            })
        })
    }
}

export const changeLogin = shouldBeLoggedIn =>{
    return {
        type:'change_auth',
        payload:shouldBeLoggedIn
    }
}

export const submitSurvey = (values,history) =>{
    return function(dispatch){
        axios.post('/api/surveys')
        .then(res=>{
            history.push('/surveys')
            dispatch({
                type:FETCH_USER,
                payload:res.data
            })
        })
    }
}

export const fetchSurveys=()=>{
    return function(dispatch){
        axios.get('/api/surveys')
        .then(r=>{
            dispatch({
                type:FETCH_SURVEYS,
                payload:r.data
        })
    })}
}