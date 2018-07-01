import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { BrowserRouter, Route, HashRouter } from 'react-router-dom';

import topicsQuery from './queries/topics';
import Login from './components/Login';

const Halelujah = props => {
    return <p>Hahelujah</p>;
};

class App extends Component {
    render() {
        return (
            // <Query query={topicsQuery}>
            //     {({ loading, error, data, refetch }) => {
            //         if (loading) return <p>Loading...</p>;
            //         if (error) return <p>Error :(</p>;
            //         console.log(data);
            //         return <div className="App">Hello App</div>;
            //     }}
            // </Query>
            <HashRouter>
                <Route path="/login" component={Login} />
            </HashRouter>
        );
    }
}

export default App;
