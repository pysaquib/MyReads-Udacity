import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Search from './Search';
import BookShelf from './BookShelf';
import * as BooksAPI from './Utils/BooksAPI';

class App extends Component {
  constructor(){
    super()
    this.state = {
      books : [],
      currentlyReading : [],
      wantToRead : [],
      read : []
    }
  }

  componentDidMount() {
    BooksAPI.getAll()
    .then((booksArr)=>{
      console.log(booksArr)
      this.setState({
          books : booksArr
      })
    })
  }

  onShelfChange = (book, shelfStatus) => {
    console.log("BOOK OBJect", book)
    BooksAPI.update(book, shelfStatus)
    .then((response)=>{
      console.log(response)
      this.setState({
        currentlyReading : response.currentlyReading,
        wantToRead : response.wantToRead,
        read : response.read
      }, ()=>(console.log(this.state.currentlyReading)))
    })
  }
  
  render(){
    return(
      <div>
        <Route exact path='/' render={()=>(
          <BookShelf 
            books={this.state.books}
            onShelfChange={this.onShelfChange} 
          />
        )}/>
        <Route path='/search' render={()=>(
          <Search 
            books={this.state.books}
            onShelfChange={this.onShelfChange}
          />
        )} />
      </div>
    )
  }
}

export default App;
