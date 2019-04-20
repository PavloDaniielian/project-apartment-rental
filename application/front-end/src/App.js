import React, { Component } from 'react';
//import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import {
  AppBar, Toolbar, Typography,
  IconButton,
} from '@material-ui/core';

import { 
  Menu as MenuIcon,
  Info as InfoIcon
} from '@material-ui/icons';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

import AboutPage from './modules/about/about-page';
import HomePage from './modules/homepage/home-page';
import NewListing from './modules/listing/new-listing';
import LoginForm from './modules/Login/LoginForm';
import Register from './modules/Register/Register';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';


class App extends Component {
  render() {

    const { classes } = this.props;

    return (
      <BrowserRouter>
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <IconButton 
                className={classes.menuButton} 
                color="inherit"
                aria-label="Menu"
                component={Link}
                to={'/about'}
              >
                <InfoIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.grow} component={Link} to={'/'} >
                SFSU - CSC 648 Team #9 Project
              </Typography>

                <Button 
                    variant="contained" 
                    color="primary"
                    component={Link}
                    to={'/new'}
                >
                   New Listing
                   <AddIcon />
                </Button>


            </Toolbar>
          </AppBar>

          <div className={classes.content} >
            <Switch>
              <Route path={'/about'} component={AboutPage} />
              <Route path={'/new'} component={NewListing} />
              <Route path={'/'} component={HomePage} />
              <Route path={'/Login'} component={LoginForm} />
              <Route path={'/Register'} component={Register} />
            </Switch>
          </div>  

        </div>
      </BrowserRouter>
    );
  }
}

export default withStyles(styles)(App);
