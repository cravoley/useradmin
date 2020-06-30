import React from 'react';
import {Route, Switch} from "react-router-dom";
import UserEdit from './UserEdit';
import UserList from './UserList';

export default () => {
  return (
    <Switch>
      <Route path="/users/edit/:userId" component={UserEdit} />
      <Route component={UserList} />
    </Switch>
  );
}