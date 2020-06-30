import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import {useHistory} from 'react-router-dom';
import React from 'react';
import {Redirect, Route} from "react-router-dom";
import api from './api';


export default props => {
  const token = localStorage.getItem('token');
  const history = useHistory();
  if (!token) {
    return <Redirect path="/" />
  }
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">
            Admin
          </Typography>
          <Button color="inherit" onClick={() => {
            api.logout();
            history.push('/')
          }}>Logout</Button>
          <Button color="inherit" onClick={() => history.push('/users')}>Users</Button>
        </Toolbar>
      </AppBar>
      <Route {...props} />
    </>
  )
}