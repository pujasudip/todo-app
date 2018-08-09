import 'materialize-css/dist/css/materialize.min.css';
import React, {Component} from 'react';
import TodoList from './todo_list';
import AddItem from './add_item';
import listData from '../data/todo';

class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            items: []
        }
    }

    componentDidMount(){
        this.getListData();
    }

    getListData(){
        // This is where we would call the server for our data
        this.setState({
            items: listData
        });
    }

    addItem(item){
        item._id = new Date().getTime();

        this.setState({
            items: [item, ...this.state.items]
        });

        console.log(item);
    }

    render(){
        console.log('state:', this.state);

        return (
            <div className="container">
                <h1 className="center">To Do List</h1>
                <AddItem add={this.addItem.bind(this)}/>
                <TodoList list={this.state.items}/>
            </div>
        );
    }
}

export default App;
