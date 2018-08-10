import React, {Component} from 'react';

class AddItem extends Component{
    state = {
        title: '',
        details: ''
    };

    handleInputChange = (event)=>{
        const {name, value} = event.target;

        // console.log("name: ", name, "value: ", value);

        this.setState({
            [name]: value
        });
    }

    handleAddItem = (event) => {
        event.preventDefault();
        // console.log(this.state);
        this.props.add(this.state);

        this.setState({
            title: '',
            details: ''
        });

    }

    render(){
        const {title, details} = this.state;
        return (
            <form onSubmit={this.handleAddItem}>
                <h5 className="green white-text center">Add Item</h5>
                <div className="row">
                    <div className="col s6">
                        <label>Title</label>
                        <input type="text" name="title" onChange={this.handleInputChange} value={title}/>
                    </div>
                    <div className="col s6">
                        <label>Details</label>
                        <input type="text" name="details" onChange={this.handleInputChange} value={details}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12 right-align">
                        <button className="btn purple">Add Item</button>
                    </div>
                </div>
            </form>
        );
    }
}

export default AddItem;