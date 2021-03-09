import React, {Component} from 'react';
import axios from '../../../axios';

import Post from '../../../components/Post/Post';
import './Posts.css';

class Posts extends Component {
    state = {
        posts: []
    }

    componentDidMount () {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                const posts = response.data.slice(0,4); //this gets all posts and returns only first 4
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Max'
                    }
                });
                this.setState({posts: updatedPosts});
                //console.log(response);
            } )
            .catch(error => {
                console.log(error);
                //this.setState({error: true})
            });
    }

    postSelectHandler = (id) => {
        this.setState({selectedPostId: id})
    }

    render () {
        let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>
        if (!this.state.error) {
            posts = this.state.posts.map(
                post => {
                    return <Post 
                                key={post.id} 
                                author={post.author} 
                                title={post.title}
                                click={() => this.postSelectHandler(post.id)} 
                                />
                }
            );
        }
        return (
            <section className="Posts">
                {posts}
            </section>
        )
    }
}

export default Posts;