import React, {Component} from 'react'
import {Link } from 'react-router-dom'

class LandingPage extends Component {
    render() {
        return (
            <div> 
                <h1>Unprinted</h1>
                <p>The crowdsourced book not-publisher.</p>
                <Link to='/book-list'>Check out the library</Link>
            </div>
        )
    }
}


export default LandingPage