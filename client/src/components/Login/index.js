import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';

import loginMutation from '../../mutations/login';

export default class Login extends Component {
    state = {
        email: '',
        password: ''
    };

    handleFormSubmit = (e, login) => {
        e.preventDefault();
        login({
            variables: {
                email: this.state.email,
                password: this.state.password
            }
        });
    };

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    render() {
        return (
            <Mutation mutation={loginMutation}>
                {(login, { loading, error, data }) => {
                    console.log('loading', loading);
                    console.log('error', error);
                    console.log('data', data);
                    return (
                        <form onSubmit={e => this.handleFormSubmit(e, login)}>
                            <div className="input-field col s6">
                                <input placeholder="Email" type="text" name="email" onChange={this.handleInputChange} />
                            </div>
                            <div className="input-field col s6">
                                <input
                                    placeholder="password"
                                    type="password"
                                    name="password"
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <button className="waves-effect waves-light btn">Login</button>
                        </form>
                    );
                }}
            </Mutation>
        );
    }
}
