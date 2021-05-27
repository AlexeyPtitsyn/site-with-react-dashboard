/**
 * @file Login component.
 * @copyright Alexey Ptitsyn <numidium.ru@gmail.com>, 2021.
 */
import React from 'react';
import Axios from 'axios';

import './LoginComponent.scss';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as Actions from '../store/actions.js';

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      login: '',
      password: '',
      isLoading: false,
      isLoginCorrect: true
    }

    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);

    this.handleLoginKeyUp = this.handleLoginKeyUp.bind(this);
    this.handlePasswordKeyUp = this.handlePasswordKeyUp.bind(this);

    this.handleLoginClick = this.handleLoginClick.bind(this);

    this.passwordRef = React.createRef();
  }

  handleLoginChange (e) {
    this.setState({
      login: e.target.value
    });
  }

  handlePasswordChange (e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLoginKeyUp(e) {
    if(e.key == 'Enter') {
      this.passwordRef.current.focus();
    }
  }

  handlePasswordKeyUp(e) {
    if(e.key == 'Enter') {
      this.handleLoginClick();
    }
  }

  /**
   * Attempt to login.
   */
  handleLoginClick() {
    this.setState({
      isLoading: true
    }, () => {
      Axios.post('backend/login.php', {
        login: this.state.login,
        password: this.state.password
      })
        .then((res) => {
          if(res.data.error) {
            this.setState({
              isLoginCorrect: false,
              isLoading: false
            });
            return;
          }

          if(res.data.isLoggedIn) {
            this.props.login();
            this.props.onLogin();
            return;
          }

          this.setState({
            isLoginCorrect: false,
            isLoading: false
          });
        })
        .catch(error => {
          console.error('Backend connection error:', error.message);
        });
    });
  }

  render() {
    return (
      <div className="login-component">

        <div className="login-component__background" />

        <div className="login-component__foreground">
          { this.state.isLoading &&
            <div className="loading" />
          }

          <div className="login-component__header">Log in</div>

          { this.state.isLoginCorrect === false &&
            <div className="login-component__login-incorrect">
              Incorrect login or password.
            </div>
          }

          <label>
            <div>Login</div>
            <input type="text" value={this.state.login}
              onChange={this.handleLoginChange}
              autoFocus={true}
              onKeyUp={ this.handleLoginKeyUp }
              placeholder="Here there be login" />
          </label>

          <label>
            <div>Password</div>
            <input type="password" value={this.state.password}
              onChange={this.handlePasswordChange}
              onKeyUp={this.handlePasswordKeyUp}
              ref={this.passwordRef}
              placeholder="Password" />
          </label>

          <div className="login-component__login-row">
            <button onClick={this.handleLoginClick}>Log in</button>
          </div>

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: bindActionCreators(Actions.login, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
