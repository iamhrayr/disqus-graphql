import React, { Component } from 'react'
import {Query} from 'react-apollo';
import moment from 'moment';
import {Link} from 'react-router-dom';

import {topicsQuery} from '../../queries/queries';


class MyTopics extends Component {

    renderTopicsList = (topics) => {
        return topics.map(topic => (
            <div className="col s12 m6" key={topic.id}>
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
                    </div>
                </div>
            </div>
        ));
    }

    render() {
        return (
            <Query query={topicsQuery}>
                {
                    ({data, loading, error}) => {
                        if (loading) return <span>Loading...</span>
                        if (error) return <span>Error :(</span>
                        return (
                            <div className="row">
                                { this.renderTopicsList(data.topics) }
                            </div>
                        )
                    }
                }
            </Query>
        )
    }
}

export default MyTopics;