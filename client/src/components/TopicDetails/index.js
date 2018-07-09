import React, { Component } from 'react'
import {Query, Mutation, Subscription} from 'react-apollo';

import {topicQuery} from '../../queries/queries'
import {addCommentMutation} from '../../mutations/mutations'
import {commentAdded} from '../../subscriptions/subscriptions';

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
                    ({loading, error, data, subscribeToMore}) => {
                        if (loading) return <span>Loading...</span>
                        if (error) return <span>Error :(</span>
                        return (
                            <Comment 
                                {...{loading, error, data}}
                                subscribeToNewComments = {() =>
                                    subscribeToMore({
                                        document: commentAdded,
                                        updateQuery: (prev, { subscriptionData }) => {
                                            console.log('prev', prev)
                                            console.log('subscriptionData', subscriptionData);

                                            if (!subscriptionData.data) return prev;
                                            const newFeedItem = subscriptionData.data.commentAdded;

                                            let bubu =  {
                                                ...prev,
                                                topic: {
                                                    ...prev.topic,
                                                    comments: [
                                                        ...prev.topic.comments,
                                                        newFeedItem
                                                    ]
                                                }
                                            }
                                            console.log('bubuuuuu', bubu)
                                            return bubu;
                                            // console.log('prev.topic.comments', prev.topic.comments)
                                            // return {
                                            //     ...prev,
                                            //     topic: {
                                            //         ...prev.topic,
                                            //         comments: [
                                            //             ...prev.topic.comments,
                                            //             newFeedItem
                                            //         ]
                                            //     }
                                            // }
                                        }
                                    })
                                }
                            />
                           
                        )
                    }
                }
            </Query>
        )
    }
}



class Comment extends Component {
    componentDidMount(){
        console.log(this.props)
        this.props.subscribeToNewComments();
    }

    render() {
        console.log(this.props);
        return (
            <span />
            // <li key={this.props.data.commentAdded.id} className="collection-item">
            //     <strong>{this.props.data.commentAdded.author.email}</strong>
            //     <p>{this.props.data.commentAdded.text}</p>
            // </li>
        )
    }
}


export default TopicDetails;