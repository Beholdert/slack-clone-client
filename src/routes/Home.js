import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { Loader } from 'semantic-ui-react';
const Home = ({ data: { loading, allUsers } }) =>
  loading ? (
    <Loader active inline="centered" />
  ) : (
    allUsers.map(u => (
      <div key={u.id}>
        <p>
          {u.id}.{' '}
          <span>
            <strong>{u.username}</strong>
          </span>{' '}
          {u.email}
        </p>
      </div>
    ))
  );

const allUsersQuery = gql`
  {
    allUsers {
      id
      email
      username
    }
  }
`;

export default graphql(allUsersQuery)(Home);
