import React from 'react';
import ReactDOM from 'react-dom';

import 'semantic-ui-css/semantic.min.css';

import {
  ApolloClient,
  createNetworkInterface,
  ApolloProvider
} from 'react-apollo';

import Routes from './routes';

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:8080/graphql'
});

const client = new ApolloClient({
  networkInterface
});

const App = (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
);

ReactDOM.render(App, document.getElementById('root'));
