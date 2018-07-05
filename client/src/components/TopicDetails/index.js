import React, { Component } from 'react'
import {Query} from 'react-apollo';

import {topicQuery} from '../../queries/queries'

class TopicDetails extends Component {
    state = {
        newComment: ''        
    }

    renderComments = (comments) => {
        return comments.map(comment => (
            <li key={comment.id} className="collection-item">
                <strong>{comment.author.email}</strong>
                <p>{comment.text}</p>
            </li>
        ))
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    
    onCommentSubmit = (e) => {
        e.preventDefault();
    }
    
    render() {
        const {id} = this.props.match.params;
        return (
            <Query query={topicQuery} variables={{ id }}>
                {
                    ({loading, error, data}) => {
                        if (loading) return <span>Loading...</span>
                        if (error) return <span>Error :(</span>
                        return (
                            <div>
                                <h3>{data.topic.title}</h3>
                                <p>{data.topic.text}</p>
                                <small>by {data.topic.author.email}</small>
                                <ul className="collection" style={{marginTop: 50}}>
                                    {this.renderComments(data.topic.comments)}
                                </ul>
                                
                                <form className="input-field col s12" onSubmit={this.onCommentSubmit}>
                                    <input 
                                        className="materialize-textarea" 
                                        placeholder="Write a comment..." 
                                        name="newComment"
                                        onChange={this.onInputChange}
                                        value={this.state.newComment}
                                    />
                                </form>
                            </div>
                        )
                    }
                }
            </Query>
        )
    }
}


export default TopicDetails;