const path = require('path');
const http = require('http');
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors')
const { ApolloServer } = require('apollo-server-express');
const { fileLoader, mergeResolvers,mergeTypes } = require('merge-graphql-schemas');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { execute, subscribe } = require('graphql');
const { makeExecutableSchema } = require('graphql-tools');

const configs = require('./config/config');
const models = require('./models');
const userFromAuthToken = require('./helpers/userFromAuthToken');

// merge graphql resolvers and types
const typesArray = fileLoader(path.join(__dirname, './schema'));
const typeDefs = mergeTypes(typesArray);
const resolversArray = fileLoader(path.join(__dirname, './resolvers'));
const resolvers = mergeResolvers(resolversArray);
const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

// init express server
const app = express();

// connect to mongoDb
mongoose.connect(configs.mongodbURI,() => {
    console.log('connected to the mLab');
});

// require passport configuration
require('./config/passport')(passport);

// add middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());

app.use('/graphql', (req, res, next) => {
    passport.authenticate('jwt', (err, user) => {
        if (err) return next(err);
        req.login(user, {session: false}, err => {
            if (err) return next(err);
            next();
        });
    })(req);
});

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        return {
            req,
            models
        };
    }
});

const httpServer = http.createServer(app);

server.applyMiddleware({app, path: '/graphql'});
// server.installSubscriptionHandlers(httpServer);

const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
    console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`)


    new SubscriptionServer({
        execute,
        subscribe,
        schema,
        context: async ({ req }) => {
            return {
                req,
                models
            };
        },
        onConnect: (connectionParams, webSocket) => {
            // console.log('connectionParams', connectionParams);
            if (connectionParams.authToken) {
                const user = userFromAuthToken(connectionParams.authToken);
                return {
                    models,
                    user
                }
            }
            // let req = {}
            // return checkToken(connectionParams.token, function(payload) {
            //     return {
            //         user: {
            //             id: payload.userId,
            //             exp: payload.exp,
            //             iat: payload.iat,
            //         },
            //     }
            // })
        },
    }, {
        server: httpServer,
        path: "/graphql",
    })
})