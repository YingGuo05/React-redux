import React,{ Component } from 'react'
import { connect } from 'react-redux'
import { selectBook } from '../actions/index'
import { bindActionCreators } from 'redux'

 class BookList extends Component{
    renderList(){
        return this.props.books.map((book)=>{
            return (
                <li onClick={()=>this.props.selectBook(book)}
                key={book.title} 
                className="list-group-item">
                {book.title}
                </li>
            )
        })
    }
    render(){
        return (
            <ul className="list-group col-sm-4">
                {this.renderList()}
            </ul>

        )
    }
}

function mapStateToProps(state){
    // whatever is returned from here will show as props
   return{ 
        books:state.books
   }
}
//Anything returned from this funciton will end up as props on booklist container
function mapDispatchToProps(dispatch){
    //whenever selectbook is called, result should be passed to all of reducers
    return bindActionCreators({selectBook:selectBook},dispatch)
}
//promote booklist from a component to container
export default connect(mapStateToProps,mapDispatchToProps)(BookList)