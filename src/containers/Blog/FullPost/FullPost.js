import React, { Component } from 'react';

import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {

    state = {
        loadedPost: null
    }
    
    componentDidUpdate() {
        if (this.props.id){
            if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)){
                axios.get('/posts/' + this.props.id)
                .then(response => {
                //console.log(response);
                this.setState({loadedPost: response.data})
            });
            }
            
        }
    }

    deletePostHandler = () =>{
        axios.delete('/posts/' + this.props.id)
        .then(response => {
            console.log(response);//fake delete
        });
    }

    render () {
        let post = <p style={{textAlign: 'center'}}>Proszę wybież fake posta!</p>;
        
        if (this.props.id){
            post = <p style={{textAlign: 'center'}}>Ładowanie...</p>;
        }

        if (this.state.loadedPost){
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button className="Delete" onClick={this.deletePostHandler}>Usuń Post</button>
                    </div>
                </div>

            );
        }
        return post;
    }
}

export default FullPost;