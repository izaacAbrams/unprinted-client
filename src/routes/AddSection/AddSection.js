import React, {Component} from 'react'
import UnprintedContext from '../../context/UnprintedContext'

class AddSection extends Component {
    static contextType = UnprintedContext

    render() {
        return (
            <div className="AddSection">
                <label htmlFor="AddSection__section">Section:</label>
                <input type='text' id="AddSection__section" />
            </div>
        )
    }
}

export default AddSection;