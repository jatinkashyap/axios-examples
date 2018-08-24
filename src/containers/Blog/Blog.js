import React, { Component } from 'react';
import {Route,NavLink,Switch} from 'react-router-dom';
import './Blog.css';
import Posts from './Posts/Posts';

//import NewPost from './NewPost/NewPost';
import asyncComponent from '../../hoc/asyncComponent';
const AsyncNewPost = asyncComponent(() => {
    return import('./NewPost/NewPost');
}); 



class Blog extends Component {

    state ={
        auth: true
    }

    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink exact to="/posts" 
                                    activeStyle={{
                                        color: '#fa923f',
                                        textDecoration : 'underline'
                                    }}
                                >Posts
                                </NavLink>
                             </li>
                            <li><NavLink 
                                    to={{
                                        pathname: '/new-post',
                                        hash: '#submit',
                                        search: '?quick-submit=true'
                                    }}
                                >New Post
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </header>

                <Switch>
                    {this.state.auth?<Route path="/new-post" component={AsyncNewPost}/> :null}
                    <Route path="/posts"  component={Posts}/>
                    <Route render={() => <h1> Not Found </h1>}/>   {/* This is the way to handle 404 requests */}
                    {/* <Redirect from="/" to="/posts"/> */}
                </Switch>
            </div>
        );
    }
}

export default Blog;