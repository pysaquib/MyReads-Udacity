import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './Utils/BooksAPI';


class Search extends Component {
    constructor(props){
        super(props)
        this.state = {
            query : '',
            books : [],
            booksListInShelf : [],
            searchedBooks : []
        }
    }

    componentDidMount(){
        this.props.books.forEach((book)=>{
            this.state.booksListInShelf.push(book.id)
        })
        console.log(this.state.booksListInShelf)
    }

    updateQuery = (event) => {
        if(event.target.value!==undefined){
            this.setState({
                query : event.target.value
            }, ()=>{
                this.searchBooks()
            })
        }
    }

    searchBooks = () => {
        if(this.state.query!==''){
            BooksAPI.search(JSON.stringify({query : this.state.query}))
            .then((response)=>{
                console.log(response)
                if(response!==undefined && !response.error){
                    this.setState({
                        searchedBooks : response
                    }, ()=>{
                        this.isBookInShelf()
                    })
                }
                else if(this.state.query.length===0 || response===undefined || response.error){
                    this.setState({
                        searchedBooks : []
                    })
                }
            })
        }
        else{
            this.setState({
                searchedBooks : []
            })
        }
    }

    shelfChangeHandler = (event) => {
        this.props.onShelfChange(event.target.name, event.target.value)
    }

    isBookInShelf = () => {
        let bookIds = []
        bookIds = this.state.searchedBooks.filter((book)=> this.state.booksListInShelf.indexOf(book.id)>=0 )
        return bookIds
    }

    returnShelfStatus = (bookId) => {
        let bookFromShelf; 
        bookFromShelf = this.props.books.filter((book)=>{
            return book.id===bookId
        })
        console.log(bookFromShelf)
        return bookFromShelf[0].shelf
    }

    render(){
        // const { books } = this.props
        const { searchedBooks } = this.state
        let showBooks;
        showBooks = searchedBooks!==undefined ? searchedBooks.map((books)=>(
            books.id
        )) : []

        return(
            <div>
                <form>
                    <input
                        type="text"
                        value={this.state.query}
                        placeholder="Search Books"
                        onChange={this.updateQuery}
                    >
                    </input>
                    <Link to='/'>Back</Link>
                    {
                        showBooks.length > 0 &&
                        searchedBooks.map((book)=>{                            
                            return(
                                <div key={book.id}>
                                    <li><h2>{book.title}</h2></li>
                                    <p>{book.subtitle}</p>
                                    <p>by {book.authors}</p>
                                    <select
                                        name={book.id} 
                                        value={(this.state.booksListInShelf.indexOf(book.id)>=0) ? this.returnShelfStatus(book.id) : 'none'}
                                        onChange={this.shelfChangeHandler}
                                    >
                                        <option value="currentlyReading">Currently Reading</option>
                                        <option value="wantToRead">Want to Read</option>
                                        <option value="read">Read</option>
                                        <option value="none">None</option>
                                    </select>
                                </div>
                            )
                        })
                    }
                </form>
            </div>
        )
    }
}

export default Search