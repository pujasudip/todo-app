import React from 'react';
import {Link} from 'react-router-dom';

export default props => {
    return (
        <li className="collection-item"><input type='checkbox' onChange={'hello'}/><label><Link to={`/item-details/${props.id}`}>{props.title}</Link></label></li>
    );
}