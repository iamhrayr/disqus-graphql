import React, { Component } from 'react'
import {Query, Mutation, Subscription} from 'react-apollo';

import {topicQuery} from '../../queries/queries'
import {addCommentMutation} from '../../mutations/mutations'
import {commentAdded} from '../../subscriptions/subscriptions';

class TopicDetails extends Component {
    state = {
        newComment: ''        
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    
    onCommentSubmit = (e, addComment) => {
        e.preventDefault();
        addComment({
            variables: {
                text: this.state.newComment, 
                topic: this.props.match.params.id
            }
        });
    }

    addCommentCompleted = () => [
        this.setState({
            newComment: ''
        })
    ]
    
    render() {
        const {id} = this.props.match.params;
    
        return (
            <Query query={topicQuery} variables={{ id }}>
                {
                    ({subscribeToMore, ...result}) => {
                        if (result.loading) return <span>Loading...</span>
                        if (result.error) return <span>Error :(</span>
                        return (
                            <div>
                                <h3>{result.data.topic.title}</h3>
                                <p>{result.data.topic.text}</p>
                                <small>by {result.data.topic.author.email}</small>
                                <ul className="collection" style={{marginTop: 50}}>
                                    <CommentList 
                                        {...result}
                                        subscribeToNewComments = {() => {
                                            subscribeToMore({
                                                document: commentAdded,
                                                updateQuery: (prev, { subscriptionData }) => {
                                                    if (!subscriptionData.data) return prev;
                                                    const newFeedItem = subscriptionData.data.commentAdded;

                                                    return Object.assign({}, prev, {
                                                        topic: {
                                                            ...prev.topic,
                                                            comments: [newFeedItem, ...prev.topic.comments]
                                                        }
                                                    });
                                                }
                                            });
                                        }}
                                    />
                                </ul>
                                <Mutation 
                                    mutation={addCommentMutation} 
                                    // refetchQueries={[{query: topicQuery, variables: {id}}]}
                                    onCompleted={this.addCommentCompleted}
                                >
                                    {
                                        (addComment, {data}) => (
                                            <form className="input-field col s12" onSubmit={(e) => this.onCommentSubmit(e, addComment)}>
                                                <input 
                                                    className="materialize-textarea" 
                                                    placeholder="Write a comment..." 
                                                    name="newComment"
                                                    onChange={this.onInputChange}
                                                    value={this.state.newComment}
                                                />
                                            </form>
                                        )
                                    }
                                   
                                </Mutation>
                            </div>
                        )
                    }
                }
            </Query>
        )
    }
}


class CommentList extends Component {
    componentDidMount(){
        this.props.subscribeToNewComments();
    }
    
    renderComments = (comments) => {
        return comments.map(comment => (
            <li key={comment.id} className="collection-item">
                <strong>{comment.author.email}</strong>
                <p>{comment.text}</p>
            </li>
        ))
    }

    render(){
        const {loading, data} = this.props
        return (
            <div>
                {this.renderComments(data.topic.comments)}
            </div>
        )
    }
}


export default TopicDetails;