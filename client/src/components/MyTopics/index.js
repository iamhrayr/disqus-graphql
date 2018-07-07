import React, { Component } from 'react'
import {Query} from 'react-apollo';
import moment from 'moment';
import {Link} from 'react-router-dom';
import {Mutation} from 'react-apollo'

import {myTopicsQuery, topicsQuery} from '../../queries/queries';
import {deleteTopicMutation} from '../../mutations/mutations';


class MyTopics extends Component {

    onTopicDelete = (deleteTopic, topicId) => {
        deleteTopic({
            variables: {
                id: topicId
            },
        })
    }

    renderTopicsList = (topics) => {
        return topics.map(topic => (
            <Mutation key={topic.id} mutation={deleteTopicMutation} refetchQueries={[{query: myTopicsQuery}, {query: topicsQuery}]}>
                {(deleteTopic, {data}) => (
                    <div className="col s12 m6">
                        <div className="card">
                            <div className="card-content">
                                <span className="card-title">{topic.title}</span>
                                <p>{topic.text}</p>
                                <span>
                                    <i className="material-icons tiny">date_range</i>
                                    { moment(topic.createdAt).fromNow() }
                                </span>
                            </div>
                            <div className="card-action">
                                <Link to={`/topic/${topic.id}`}>Read Topic</Link>
                                <button onClick={() => this.onTopicDelete(deleteTopic, topic.id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                )}
            </Mutation>
        ));
    }

    render() {
        return (
            <Query query={myTopicsQuery}>
                {
                    ({data, loading, error}) => {
                        if (loading) return <span>Loading...</span>
                        if (error) return <span>Error :(</span>
                        return (
                            <div className="row">
                                { this.renderTopicsList(data.myTopics) }
                            </div>
                        )
                    }
                }
            </Query>
        )
    }
}

export default MyTopics;