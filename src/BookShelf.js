import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card } from 'antd';
import 'antd/dist/antd.css';


const BookShelf = (props) => {

    const shelfChangeHandler = (event) => {
        props.onShelfChange(event.target.name, event.target.value)
    }

    const shelf={'currentlyReading' : [], 'wantToRead' : [], 'read' : []}
    const { books } = props
    books.forEach((book)=>(
        shelf[book.shelf].push(book)
    ))
    return(
        <div>
            <Row className='rows'>
                <Col lg={24} sm={24}>
                    <h1 className="shelf-heading">Currently Reading</h1>
                    <ul>
                    {
                        shelf['currentlyReading'].map((book)=>(
                            <div key={book.id}>
                                <div className="books" key={book.id}>
                                    {book.title}<br />
                                    By {book.authors}
                                </div>
                                <select
                                    name={book.id}
                                    defaultValue={book.shelf}
                                    onChange={shelfChangeHandler}
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
                </Col>
            </Row>
            <Row className="rows">
                <Col lg={24} sm={24}>
                    <h1 className="shelf-heading">Want</h1>
                    <ul>
                    {
                        shelf['wantToRead'].map((book)=>(
                            <div key={book.id}>
                                <div className="books" key={book.id}>
                                    {book.title}<br />
                                    By {book.authors}
                                </div>
                                <select
                                    name={book.id}
                                    defaultValue={book.shelf}
                                    onChange={shelfChangeHandler}
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
                </Col>
            </Row>
            <Row className="rows">
                <Col lg={24} sm={24}>
                    <div className="shelf-heading">
                        <h1>Read</h1>
                    </div>
                    <ul>
                    {
                        shelf['read'].map((book)=>(
                            <div key={book.id}>
                                <div className="books">
                                    {book.title}<br />
                                    By {book.authors}
                                </div>
                                <select
                                    name={book.id}
                                    defaultValue={book.shelf}
                                    onChange={shelfChangeHandler}
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
                </Col>
            </Row>
            <Link to='/search'>Search</Link>
        </div>
    )
}

export default BookShelf;