import { Route, Redirect } from 'react-router-dom';
import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Loader } from 'semantic-ui-react';

const PrivateRoute = ({
  component: Component,
  data: { loading, checkAuth },
  history,
  ...rest
}) => {
  console.log(rest);
  console.log(checkAuth);
  return loading ? (
    <Loader active inline="centered" />
  ) : checkAuth.ok ? (
    <Route component={Component} />
  ) : (
    <Redirect to="/login" />
  );
};

const checkAuthQuery = gql`
  {
    checkAuth {
      ok
    }
  }
`;

export default graphql(checkAuthQuery)(PrivateRoute);
