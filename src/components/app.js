import 'materialize-css/dist/css/materialize.min.css';
import React, {Component} from 'react';
import TodoList from './todo_list';
import AddItem from './add_item';
import listData from '../data/todo';
import axios from 'axios';

const BASE_URL = 'http://api.reactprototypes.com';
// const API_KEY = '?key=c618_demouser';
const API_KEY = '?key=618-lfz-sudip-todolist';

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

    async getListData(){
        // This is where we would call the server for our data
        // 'http://api.reactprototypes.com/todos?key=c416_demouser';
        // const repsonse = axios.get(`${BASE_URL}/todos${API_KEY}`).then(resp=> {
        //     console.log('success:', resp);
        //     this.setState({
        //         items: resp.data.todos
        //     });
        // })
        //     .catch(error=>console.log('error: ', error.message));

        // console.log('resp:', repsonse);

        const resp = await axios.get(`${BASE_URL}/todos${API_KEY}`);

        this.setState({
            items: resp.data.todos
        });
    }

    async addItem(item){
        // item._id = new Date().getTime();
        //
        // this.setState({
        //     items: [item, ...this.state.items]
        // });

        // const response = await axios.post(`${BASE_URL}/todos${API_KEY}`, item);
        try {
            if(!item.title){
                throw new Error("missing title");
            }
            if(!item.details){
                throw new Error("missing details");
            }

            await axios.post(`${BASE_URL}/todos${API_KEY}`, item);
        } catch(e){
            console.log('something went wrong: ', e.message)
        }
        // console.log('server response:', response);

        this.getListData();

    }

    render(){
        // console.log('state:', this.state);

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
