import React from 'react';
import { gql, graphql } from 'react-apollo';

const Home = ({ data: { loading, allUsers } }) =>
  loading
    ? 'loading'
    : allUsers.map(u => (
        <div key={u.id}>
          <p>
            {u.id}.{' '}
            <span>
              <strong>{u.username}</strong>
            </span>{' '}
            {u.email}
          </p>
        </div>
      ));

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
