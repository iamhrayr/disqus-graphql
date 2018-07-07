import React, { Component } from 'react';
import { BrowserRouter, Route, HashRouter, Link } from 'react-router-dom';

import Login from './components/Login';
import Signup from './components/Signup';
import MyTopics from './components/MyTopics';
import TopicDetails from './components/TopicDetails';
import CreateTopic from './components/CreateTopic';
import Home from './components/Home';
import Header from './components/Header';

class App extends Component {
    render() {
        return (
            <HashRouter>
                <React.Fragment>
                    <Header />
                    <div className="container">
                        <div className="fixed-action-btn direction-top" style={{bottom: '45px', right: '24px'}}>
                            <Link to='/create-topic' className="btn-floating btn-large waves-effect waves-light red"><i className="material-icons">add</i></Link>
                        </div>

                        
                        <Route path="/" exact component={Home} />
                        <Route path="/login" component={Login} />
                        <Route path="/signup" component={Signup} />
                        <Route path="/my-topics" component={MyTopics} />
                        <Route path="/topic/:id" component={TopicDetails} />
                        <Route path="/create-topic" component={CreateTopic} />
                    </div>
                </React.Fragment>
            </HashRouter>
        );
    }
}

export default App;
