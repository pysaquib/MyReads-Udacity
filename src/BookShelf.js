import React from 'react';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';


export const Books = (props) => {
    return(
        <div className='rows'>
            <div>
                <h1 className="shelf-heading">{props.shelfHeading}</h1>
                <ul>
                {
                    props.shelfCategory.map((book)=>(
                        <div key={book.id}>
                            <img src={book.imageLinks.thumbnail} alt={book.title}>
                            </img>
                            <div className="books">
                                {book.title}<br />
                                By {book.authors}
                            </div>
                            <select
                                name={book.id}
                                defaultValue={book.shelf}
                                onChange={props.shelfChangeHandler}
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
        </div>
    )
}

const BookShelf = (props) => {
    console.log(props.books)

    const shelfChangeHandler = (event) => {
        props.onShelfChange(event.target.name, event.target.value)
    }


    const shelf={'currentlyReading' : [], 'wantToRead' : [], 'read' : []}
    const { books } = props
    books.forEach((book)=>(
        shelf[book.shelf] = shelf[book.shelf].concat(book)
    ))

    return(
        <div>
            <Books 
                shelfCategory={shelf.currentlyReading} 
                shelfHeading="Currently Reading" 
                shelfChangeHandler={shelfChangeHandler}
            />
            <Books 
                shelfCategory={shelf.wantToRead} 
                shelfHeading="Want To Read" 
                shelfChangeHandler={shelfChangeHandler}
            />
            <Books 
                shelfCategory={shelf.read} 
                shelfHeading="Read" 
                shelfChangeHandler={shelfChangeHandler}
            />
            <Link to='/search'>Search</Link>
        </div>
    )
}

export default BookShelf;