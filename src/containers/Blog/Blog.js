import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

import axios from 'axios';

class Blog extends Component {

    state = {
        posts: [],
        selectedPostId: null,
        error: false
    }


componentDidMount(){
    axios.get('/posts')
    .then(response => {
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map(post => {
            return {
                ...post,
                author: 'Kuba'
            }
        });
        this.setState({
            posts: updatedPosts
        })
        //console.log(response);
    })
    .catch(error => {
        // handle error
        console.log(error);
        this.setState({error: true})
    });
    }

    postSelectedHandler = (id) => {
        this.setState({selectedPostId: id});
    }

    render () {     
        let posts = <p style={{textAlign : 'center'}}>Coś jest nie tak pojawił się ERROR</p>
        if (!this.state.error){
        posts = this.state.posts.map(post => {

                return <Post 
                    key={post.id} 
                    title={post.title}
                    author={post.author}
                    clicked={() => this.postSelectedHandler(post.id)}
                />
            }
            );
        }   
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost 
                        id={this.state.selectedPostId}
                        title={null}
                        content={null}
                    />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;