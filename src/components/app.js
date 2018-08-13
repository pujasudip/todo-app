import 'materialize-css/dist/css/materialize.min.css';
import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import axios from 'axios';
import Home from './home';
import NotFound from './404';
import ItemDetails from './item_details';
import config from '../config';

class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            items: []
        }
    }

    async getListData(){
        const {BASE_URL, API_KEY} = config.api;
        const resp = await axios.get(`${BASE_URL}/todos${API_KEY}`);

        this.setState({
            items: resp.data.todos
        });
    }

    async addItem(item){
        const {BASE_URL, API_KEY} = config.api;

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

    async deleteItem(id){
        const {BASE_URL, API_KEY} = config.api;

        try{
            const resp = await axios.delete(`${BASE_URL}/todos/${id}${API_KEY}`);
            console.log('delete: ', resp);
        } catch(e){
            console.log('error in deletion: ', e.message);
        }
    }

    render(){
        return (
            <div className="container">
               <Switch>
                   <Route exact path="/" render={props=>
                       <Home
                           getList = {this.getListData.bind(this)}
                           add={this.addItem.bind(this)}
                           list={this.state.items}
                           {...props} />
                   }/>
                   <Route path='/item-details/:item_id' render={(routeProps)=>{
                       return <ItemDetails delete={this.deleteItem.bind(this)} {...routeProps}/>
                   }} />
                   <Route component={NotFound} />
               </Switch>
            </div>
        );
    }
}

export default App;
