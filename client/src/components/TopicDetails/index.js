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
            <Subscription subscription={commentAdded}>
                {
                    (obj) => {
                        console.log('## data ##', obj)
                        return <span>Lalalala</span>;
                    }
                }
            </Subscription>
        )
        // return (
        //     <Query query={topicQuery} variables={{ id }}>
        //         {
        //             ({loading, error, data}) => {
        //                 if (loading) return <span>Loading...</span>
        //                 if (error) return <span>Error :(</span>
        //                 return (
        //                     <div>
        //                         <h3>{data.topic.title}</h3>
        //                         <p>{data.topic.text}</p>
        //                         <small>by {data.topic.author.email}</small>
        //                         <ul className="collection" style={{marginTop: 50}}>
        //                             <Subscription subscription={onCommentAdded}>
        //                                 {
        //                                     ({ data, loading }) => {
        //                                         console.log('## data ##', data)
        //                                         return <span>Lalalala</span>;
        //                                     }
        //                                 }
        //                                 {/* {this.renderComments(data.topic.comments)} */}
        //                             </Subscription>
        //                         </ul>
        //                         <Mutation 
        //                             mutation={addCommentMutation} 
        //                             refetchQueries={[{query: topicQuery, variables: {id}}]}
        //                             onCompleted={this.addCommentCompleted}
        //                         >
        //                             {
        //                                 (addComment, {data}) => (
        //                                     <form className="input-field col s12" onSubmit={(e) => this.onCommentSubmit(e, addComment)}>
        //                                         <input 
        //                                             className="materialize-textarea" 
        //                                             placeholder="Write a comment..." 
        //                                             name="newComment"
        //                                             onChange={this.onInputChange}
        //                                             value={this.state.newComment}
        //                                         />
        //                                     </form>
        //                                 )
        //                             }
                                   
        //                         </Mutation>
        //                     </div>
        //                 )
        //             }
        //         }
        //     </Query>
        // )
    }
}


export default TopicDetails;