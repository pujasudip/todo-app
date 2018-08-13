import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import config from '../config';

class ItemDetails extends Component {

    componentDidMount(){
        const id =  this.props.match.params.item_id;
    }

    render(){
        return (
            <div>
                <h1 className='center'>Item Details</h1>
                <div className="row">
                    <div className="col s12 right-align">
                        <Link to="/" className='btn purple darken-2'>Back to List</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default ItemDetails;