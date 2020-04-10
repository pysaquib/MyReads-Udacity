import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Search extends Component {
    constructor(props){
        super(props)
        this.state = {
            query : '',
            books : []
        }
    }

    updateQuery = (event) => {
        this.setState({
            query : event.target.value
        })
    }

    shelfChangeHandler = (event) => {
        this.props.onShelfChange(event.target.name, event.target.value)
    }


    render(){
        const { books } = this.props
        const { query } = this.state
        const showBooks = query==='' ? null : books.filter((eachBook)=>(
            eachBook.title.toLowerCase().includes(query.toLowerCase())
        ))
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
                        showBooks &&
                        showBooks.map((each)=>{                            
                            return(
                                <div>
                                    <li key={each.id}><h2>{each.title}</h2></li>
                                    <p>{each.subtitle}</p>
                                    <select
                                        name={each.id} 
                                        value={each.shelf}
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