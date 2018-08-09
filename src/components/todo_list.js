import React, { Component } from 'react';
import listData from '../data/todo';

class TodoList extends Component{
    render(){
        const listElements = listData.map((item, index)=>{
            return (<li key={item._id}>{item.title}</li>)
        });
        console.log('list:', listData);
        return (
            <div>
                <ul>
                    {listElements}
                </ul>
            </div>
        );
    }
}

export default TodoList;