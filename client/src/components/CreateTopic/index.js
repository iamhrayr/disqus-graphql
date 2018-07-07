import React, { Component } from 'react'
import { Mutation } from 'react-apollo';

import {createTopicMutation} from '../../mutations/mutations';
import {myTopicsQuery} from '../../queries/queries';
import {topicsQuery} from '../../queries/queries';

class CreateTopic extends Component {
    state = {
        title: '',
        text: ''
    }

    onFormSubmit = (e, createTopic) => {
        e.preventDefault();
        createTopic({
            variables: {
                title: this.state.title,
                text: this.state.text
            }
        })
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleMutationCompleted = () => {
        this.props.history.push('/my-topics');
    }

    render() {
        return (
            <Mutation 
                mutation={createTopicMutation} 
                onCompleted={this.handleMutationCompleted} 
                refetchQueries={[{query: myTopicsQuery}, {query: topicsQuery}]}
            >
                {
                    (createTopic, {data}) => (
                        <form onSubmit={e => this.onFormSubmit(e, createTopic)}>
                            <div className="input-field col s6">
                                <input
                                    placeholder="Topic Title"
                                    name="title"
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className="input-field col s6">
                                <input
                                    placeholder="Text"
                                    name="text"
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <button className="btn">Save</button>
                        </form>
                    )
                }
                
            </Mutation>
        )
    }
}

export default  CreateTopic;