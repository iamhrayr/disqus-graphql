import React, { Component } from 'react';
import { BrowserRouter, Route, HashRouter } from 'react-router-dom';

import Login from './components/Login';
import MyTopics from './components/MyTopics';
import TopicDetails from './components/TopicDetails';
import Header from './components/Header';

const Halelujah = props => {
    return <p>Hahelujah</p>;
};

class App extends Component {
    render() {
        return (
            <HashRouter>
                <React.Fragment>
                    <Header />
                    <div className="container">
                        <Route path="/login" component={Login} />
                        <Route path="/my-topics" component={MyTopics} />
                        <Route path="/topic/:id" component={TopicDetails} />
                    </div>
                </React.Fragment>
            </HashRouter>
        );
    }
}

export default App;
