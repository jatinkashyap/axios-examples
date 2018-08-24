import React, {Component} from 'react';
import Post from '../../../components/Post/Post';
import axios from '../../../axios';
import {Route} from 'react-router-dom';
import FullPost from '../FullPost/FullPost';

import './Posts.css';

class Posts extends Component {

    state = {
        posts: []
    }


    componentDidMount (){
        axios.get('/posts')
            .then(response => {
                const newPosts = response.data.slice(0,4);
                const updatedPosts = newPosts.map(post => {
                    return {
                        ...post,
                        author: 'Max'
                    }
                });
                this.setState({posts : updatedPosts});
                
            })
            .catch(error => {
                this.setState({errorGettingPosts : true})
            });
    }

    postClickedHandler = (id) => {
        //this.props.history.push({pathname : '/'+id});
        this.props.history.push('/posts/'+id);
    }

    render(){
        
        let posts = <p style={{textAlign :'center'}}>  Something went wrong </p>
        if(!this.state.errorGettingPosts){
            posts = this.state.posts.map(post => {
                return (
                        //<Link to={'/'+ post.id}  >
                            <Post  
                                key={post.id}
                                title={post.title} 
                                author={post.author}
                                clicked={() => this.postClickedHandler(post.id)}
                            />
                        //</Link>
                        );
            });
        }
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url + '/:id'} exact component={FullPost}/>
            </div>
        );
    }
}

export default Posts;