import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './Home';
import Register from './Register';
import Login from './Login';
import CreateTeam from './CreateTeam';
import PrivateRoute from './PrivateRoute';
import ViewTeam from './ViewTeam';

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/register" exact component={Register} />
      <Route path="/login" exact component={Login} />
      <PrivateRoute path="/create_team" exact component={CreateTeam} />
      <Route
        path="/view_team/:teamId?/:channelId?"
        exact
        component={ViewTeam}
      />
    </Switch>
  </BrowserRouter>
);
