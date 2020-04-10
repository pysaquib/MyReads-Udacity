import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Search from './Search';
import BookShelf from './BookShelf';
import * as BooksAPI from './Utils/BooksAPI';
import 'antd/dist/antd.css';
import './App.css';

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
        if(shelfStatus!=='none'){
            BooksAPI.update(book, shelfStatus)
            .then((response)=>{
                if(response){
                    BooksAPI.getAll()
                    .then((booksArr)=>{
                        this.setState({
                            books : booksArr
                        })
                    })
                }
            })
        }
    }

    render(){
        return(
            <div>
                <Route exact path="/" render={()=>(
                    <BookShelf
                        books={this.state.books}
                        onShelfChange={this.onShelfChange}
                    />
                )} />
                <Route path="/search" render={()=>(
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