import React from 'react';

import { findIndex } from 'lodash';
import decode from 'jwt-decode';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Channels from '../components/Channels';
import Teams from '../components/Teams';
import AddChannelModal from '../components/AddChannelModal';
import { Redirect } from 'react-router-dom';

class Sidebar extends React.Component {
  state = {
    openAddChannelModal: false
  };

  handleAddChannelClick = () => {
    this.setState({ openAddChannelModal: true });
  };

  handleCloseAddChannelModal = () => {
    this.setState({ openAddChannelModal: false });
  };

  render() {
    const {
      data: { loading, allTeams, error },
      currentTeamId
    } = this.props;

    if (loading) {
      return null;
    }

    if (error) {
      return <Redirect to="/login" />;
    }

    const teamIdx = currentTeamId
      ? findIndex(allTeams, ['id', parseInt(currentTeamId, 10)])
      : 0;
    const team = allTeams[teamIdx];

    console.log(allTeams);
    let username = '';

    try {
      const token = localStorage.getItem('token');
      console.log(token);

      const { user } = decode(token);

      console.log(user);
      username = user.username;
    } catch (err) {}

    return (
      <React.Fragment>
        <Teams
          teams={allTeams.map(t => ({
            id: t.id,
            letter: t.name.charAt(0).toUpperCase()
          }))}
        />
        <Channels
          teamName={team.name}
          username={username}
          channels={team.channels}
          users={[{ id: 1, name: 'slackbot' }, { id: 2, name: 'user2' }]}
          onAddChannelClick={this.handleAddChannelClick}
        />
        <AddChannelModal
          onClose={this.handleCloseAddChannelModal}
          open={this.state.openAddChannelModal}
        />
      </React.Fragment>
    );
  }
}

const allTeamsQuery = gql`
  {
    allTeams {
      id
      name
      channels {
        id
        name
      }
    }
  }
`;

export default graphql(allTeamsQuery)(Sidebar);
