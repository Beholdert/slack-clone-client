import React from 'react';

import decode from 'jwt-decode';

import Channels from '../components/Channels';
import Teams from '../components/Teams';
import AddChannelModal from '../components/AddChannelModal';
import InvitePeopleModal from '../components/InvitePeopleModal';
export default class Sidebar extends React.Component {
  state = {
    openAddChannelModal: false,
    openInvitePeopleModal: false
  };

  handleAddChannelClick = () => {
    this.setState({ openAddChannelModal: true });
  };

  handleCloseAddChannelModal = () => {
    this.setState({ openAddChannelModal: false });
  };

  handleInvitePeopleClick = () => {
    this.setState({ openInvitePeopleModal: true });
  };

  handleCloseInvitePeopleModal = () => {
    this.setState({ openInvitePeopleModal: false });
  };

  render() {
    const { teams, team } = this.props;

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
        <Teams teams={teams} />
        <Channels
          teamId={team.id}
          teamName={team.name}
          username={username}
          channels={team.channels}
          users={[{ id: 1, name: 'slackbot' }, { id: 2, name: 'user2' }]}
          onAddChannelClick={this.handleAddChannelClick}
          onInvitePeople={this.handleInvitePeopleClick}
        />
        <AddChannelModal
          teamId={team.id}
          onClose={this.handleCloseAddChannelModal}
          open={this.state.openAddChannelModal}
        />
        <InvitePeopleModal
          teamId={team.id}
          onClose={this.handleInvitePeopleClick}
          open={this.state.handleCloseInvitePeopleModal}
        />
      </React.Fragment>
    );
  }
}
