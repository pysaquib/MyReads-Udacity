import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class BookShelf extends Component {

    shelfChangeHandler = (event) => {
        this.props.onShelfChange(event.target.name, event.target.value)
    }

    render(){
        const shelf={'currentlyReading' : [], 'wantToRead' : [], 'read' : []}
        const { books } = this.props
        books.forEach((book)=>(
            shelf[book.shelf].push(book)
        ))
        return(
            <div>
                <div>
                    <h1>Currently Reading</h1>
                    <ul>
                    {
                        shelf['currentlyReading'].map((each)=>(
                            <div>
                                <li key={each.id}>{each.title}</li>
                                <select
                                    name={each.id}
                                    defaultValue={each.shelf}
                                    onChange={this.shelfChangeHandler}
                                >
                                    <option value="currentlyReading">Currently Reading</option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                </select>
                            </div>
                        ))
                    }
                    </ul>
                </div>
                <div>
                    <h1>Want To Read</h1>
                    <ul>
                    {
                        shelf['wantToRead'].map((each)=>(
                            <div>
                                <li key={each.id}>{each.title}</li>
                                <select
                                    name={each.id}
                                    defaultValue={each.shelf}
                                    onChange={this.shelfChangeHandler}
                                >
                                    <option value="currentlyReading">Currently Reading</option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                </select>
                            </div>

                        ))
                    }
                    </ul>
                </div>
                <div>
                    <h1>Read</h1>
                    <ul>
                    {
                        shelf['read'].map((each)=>(
                            <div>
                                <li key={each.id}>{each.title}</li>
                                <select
                                    name={each.id}
                                    defaultValue={each.shelf}
                                    onChange={this.shelfChangeHandler}
                                >
                                    <option value="currentlyReading">Currently Reading</option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                </select>
                            </div>

                        ))
                    }
                    </ul>
                </div>
                <Link to='/search'>Search</Link>
            </div>
        )
    }
}

export default BookShelf;