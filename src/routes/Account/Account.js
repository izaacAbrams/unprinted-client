import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Account extends Component {
    render(){ 
        return (
            <div>
                <Link to='/new'>Create a new book</Link>
                
            </div>
        )
    }
}

export default Account