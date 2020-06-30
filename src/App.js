import Container from '@material-ui/core/Container';
import React from 'react';
import {Route, Switch} from "react-router-dom";
import './App.css';
import ProtectedRoute from './app/ProtectedRoute';
import Login from './features/login';
import Users from './features/users';

function App() {
  return (
    <Container>
      <Switch>
        <ProtectedRoute path="/users" component={Users} />
        <Route component={Login} />
      </Switch>
    </Container>
  );
}

export default App;
