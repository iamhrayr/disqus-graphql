import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { Query, ApolloConsumer } from 'react-apollo'

// import client from '../apolloClient';

const query = gql`
    {
        auth @client {
            isAuth
        }
    }
`;

class Header extends Component {
    renderGuestMenu(){
        return (
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/signup">Signup</Link></li>
            </ul>
        )
    }
    renderUserMenu(){
        return (
            <ApolloConsumer>
                {
                    client => (
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><Link to="/my-topics">My Topics</Link></li>
                            <li><a onClick={(e) => this.logoutHandler(e, client)}>Logout</a></li>
                        </ul>
                    )
                }
                
            </ApolloConsumer>
        )
    }

    logoutHandler = (e, client) => {
        e.preventDefault();
        localStorage.removeItem('token');
        // client.resetStore();
        client.writeData({ 
            data: { 
                auth: { __typename: 'Auth', isAuth: false } 
            } 
        })
    }
    
    render() {
        return (
            <Query query={query}>
                {
                    ({data, loading}) => {
                        console.log('data', data)
                        return (
                            <nav>
                                <div className="nav-wrapper">
                                    <a href="#" className="brand-logo">
                                        Disqus
                                    </a>
                                    {data.auth.isAuth && this.renderUserMenu()}
                                    {!data.auth.isAuth && this.renderGuestMenu()}
                                </div>
                            </nav>
                        )
                    }
                }
                
            </Query>
        );
    }
}

export default Header;
