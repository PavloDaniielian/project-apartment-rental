import React, { Component } from 'react';
import { withStyles, FormControlLabel } from '@material-ui/core';
import Formsy from 'formsy-react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import ValidateTextField from './field-with-validation';
import LoginRegisterError from "./registration-error";

import {userRegister} from '../../api/user.actions';


const styles = theme => ({
  root: {
    marginLeft: theme.spacing.unit*10,
    marginRight: theme.spacing.unit*10,
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  field: {
    marginTop: theme.spacing.unit,
    width: theme.spacing.unit*50
  },
  actions: {
    marginTop: theme.spacing.unit * 2
  }
});


class Register extends Component {
  static propTypes = {
    onRegister: PropTypes.func,
    registerFailed: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      canSubmit: false,
      admin: false
    }
    this._handleCheck = this._handleCheck.bind(this);
  }

  registerSubmit = (regForm) =>{
    regForm.isAdmin = this.state.admin;
    userRegister(regForm, (response)=>{
      alert(response);
    });
  }

  _handleCheck = () => {
    const { admin } = this.state;
    this.setState({ admin: !admin })
  }

  render() {

    const { classes, registerFailed } = this.props;
    const { canSubmit, admin } = this.state;

    return (
      <div className={classes.root}>
        <Formsy className={classes.form}
          onValid={this.enableSubmit} onInvalid={this.disableSubmit}
          onValidSubmit={this.registerSubmit}>

          <ValidateTextField
            name="firstName"
            autoComplete="firstName"
            validations="minLength:3"
            validationErrors={{
              minLength: "Too short"
            }}
            required
            className={classes.field}
            label="First Name"
          />

          <ValidateTextField
            name="lastName"
            autoComplete="lastName"
            validations="minLength:3"
            validationErrors={{
              minLength: "Too short"
            }}
            required
            className={classes.field}
            label="Last Name"
          />

          <ValidateTextField
            name="email"
            autoComplete="email"
            validations="minLength:3"
            validationErrors={{
              minLength: "Too short"
            }}
            required
            className={classes.field}
            label="Email"
          />

          <ValidateTextField
            type="password"
            name="password"
            autoComplete="new-password"
            validations="minLength:2"
            validationErrors={{
              minLength: "Too short"
            }}
            required
            className={classes.field}
            label="Create a password"
          />

          <ValidateTextField
            type="password"
            name="repeatPassword"
            autoComplete="new-password"
            validations="equalsField:password"
            validationErrors={{
              equalsField: "passwords must match"
            }}
            required
            className={classes.field}
            label="Enter password again"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={admin}
                onChange={this._handleCheck}
                name ="isAdmin"
                value="admin"
                color="primary"
              />
            }
            name ="isAdmin"
            label="Admin"
          />
          {
            registerFailed && <LoginRegisterError message={registerFailed} />
          }

          <div className={classes.actions}>
            <Button type="submit"
              fullWidth             
              variant="contained" color="primary"
              disabled={!canSubmit}>Register</Button>
          </div>

        </Formsy>
      </div>
    );
  }

  disableSubmit = () => {
    this.setState({ canSubmit: false })
  };

  enableSubmit = () => {
    this.setState({ canSubmit: true })
  };

}

export default withStyles(styles)(Register);