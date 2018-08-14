import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import config from '../config';
import axios from "axios";

class ItemDetails extends Component {
    state = {
        itemDetails: {}
    }


    async handleDelete(){
        console.log('Delete item:', this.state.itemDetails._id);
        await this.props.delete(this.state.itemDetails._id);

        this.props.history.push('/');
    }

    async handleToggleComplete(){
        const todoItem = await this.props.update(this.state.itemDetails._id);

        this.setState({
            itemDetails: todoItem
        });
    }

    async componentDidMount(){
        const {BASE_URL, API_KEY} = config.api;
        const {item_id} =  this.props.match.params;

        const resp = await axios.get(`${BASE_URL}/todos/${item_id}${API_KEY}`);

        this.setState({
            itemDetails: resp.data.todo
        });
    }

    render(){
        const { itemDetails } = this.state;

        let btnInfo = {
            btnStyle: '',
            btnText: ''
        };
        itemDetails.complete ?
            btnInfo = {btnText: 'Restore The Task', btnStyle: 'btn purple darken-2'} :
            btnInfo = {btnText: 'Mark As Complete', btnStyle: 'btn green darken-2'};

        console.log('btnStyle: ', btnInfo);


        return (
            <div>
                <h1 className='center'>Item Details</h1>
                <div className="row">
                    <div className="col s12 right-align">
                        <Link to="/" className='btn purple darken-2'>Back to List</Link>
                    </div>
                </div>
                <h4><em>Title: </em>{itemDetails.title}</h4>
                <h5>
                    {
                        itemDetails.complete ? 'Item Complete ' : 'Item is not yet Complete'
                    }
                </h5>
                <div className="row">
                    <div className="col s6 center">
                        <button className={btnInfo.btnStyle} onClick={this.handleToggleComplete.bind(this)}>{btnInfo.btnText}</button>
                    </div>
                    <div className="col s6 center">
                        <button className="btn red darken-2" onClick={this.handleDelete.bind(this)}>Delete</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ItemDetails;