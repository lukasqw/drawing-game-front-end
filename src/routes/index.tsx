import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Home from '../pages/Home';
import ListRooms from '../pages/ListRooms';
import Room from '../pages/Room';
import NotFound from '../pages/NotFound';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/room" exact component={ListRooms} isPrivate/>
    <Route path="/room/:id_room" component={Room}  isPrivate/>
    <Route path="/notfound" component={NotFound} isPrivate/>
  </Switch>
);

export default Routes;
