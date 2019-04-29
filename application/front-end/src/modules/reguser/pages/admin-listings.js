import React, { Component } from 'react';
import {
  withStyles, Grid, Paper, Button,
  CardActions
} from '@material-ui/core';
import ListingCard from '../../_global/component/listing-card';
import styles from '../styles/styles';
import _ from 'lodash';
import { getListings } from '../../../api/listings.actions';

const FormRow = ({ listings, columnView = true }) => {
  return (
    <React.Fragment>
      {
        listings.map((value, index) => (
          <Grid
            item
            lg={columnView ? 4 : 11}
            md={6}
            sm={12}
            style={{ width: '100%' }}
            key={`grid-index-${index}`}
          >
            <ListingCard
              listing={value}
              actions={(
                <CardActions>
                  <Button size="small" color="primary">
                    Approve
                  </Button>
                  <Button size="small" color="secondary">
                    Reject
                  </Button>
                </CardActions>
              )}
            />
          </Grid>
        ))
      }
    </React.Fragment>
  );
}

class AdminListings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      listings: [],
      sortMenuVisible: false,
      anchorEl: null,
      sortBy: null
    };
    this.getListings = this.getListings.bind(this);
    this.handleSortTxt = this.handleSortTxt.bind(this);
    this._toggleSortMenu = this._toggleSortMenu.bind(this);
  }

  _toggleSortMenu = (event) => {
    const { sortMenuVisible } = this.state;
    let state = { sortMenuVisible: !sortMenuVisible };
    if(event){
      state['anchorEl'] = event.currentTarget;
    }
    this.setState(state)
  }

  componentWillMount() {
    this.getListings();
  }


  getListings = (query = {}) => {
    let params = new URLSearchParams();
    if (query.types && !_.isEmpty(query.types)) {
      let selectedTypes = query.types;
      selectedTypes.forEach((value) => params.append("type", value));
    }
    if(query.beds && query.beds !== '0'){
      params.append("beds", query.beds);
    }
    if(query.sortBy){
      params.append("sortBy", query.sortBy);
    }
    if(query.text){
      params.append("text", encodeURI(query.text));
    }
    getListings(params, (data) => {
      this.setState({ listings: data || [] })
    })
  }

  displayListings = (listings, columnView) => {
    let rows = [];
    for (let i = 0; i < listings.length; i += 3) {
      rows.push(
        <Grid
          container
          key={`grid-container-${i + 1}`}
        >
          <FormRow
            listings={listings.slice(i, i + 3)}
            props={this.props}
            columnView={columnView}
          />
        </Grid>
      );
    }
    return rows;
  }

  handleSortTxt = key => {
    const { searchTxt, query } = this.state;
    this.setState({ sortBy: key }, () => this.getListings({
      ...query,
      text: searchTxt,
      sortBy: key
    }));
  };

  render() {
    const classes = this.props.classes;
    const { listings, columnView } = this.state;

    return (
      <Paper className={classes.main} elevation={1}>
        <Grid container style={{ width: '100%' }} >
          <Grid item lg={12} md={12} sm={12} >
            {this.displayListings(listings, columnView)}
          </Grid>
        </Grid>
      </Paper>

    );
  }
}

export default withStyles(styles, { withTheme: true })(AdminListings);