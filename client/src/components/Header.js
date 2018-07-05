import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { Query } from 'react-apollo'


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
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><Link to="/my-topics">My Topics</Link></li>
                <li><Link to="/logout">Logout</Link></li>
            </ul>
        )
    }
    
    render() {
        return (
            <Query query={query}>
                {
                    ({data, loading}) => {
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



// class Header extends Component {
//     render() {
//         return (
//             <Query query={query1}>
//                 {
//                     ({client, data, loading, error}) => {
//                         console.log('data', data);
//                         console.log('client', client);
//                         console.log('loading', loading);
//                         console.log('error', error);
//                         return <nav>
//                             <div className="nav-wrapper">
//                                 <a href="#" className="brand-logo">
//                                     Disqus
//                                 </a>
//                                 <ul id="nav-mobile" className="right hide-on-med-and-down">
//                                     <li><Link to="/login">Login</Link></li>
//                                     <li><Link to="/signup">Signup</Link></li>
//                                 </ul>
//                             </div>
//                         </nav>
//                     }
//                 }
                
//             </Query>
//         );
//     }
// }

export default Header;
