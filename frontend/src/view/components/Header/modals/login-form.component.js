import React from "react";
import { connect } from "react-redux";

import { loginValidation } from "../../../../helper/validation.helper.js";
import { sendLoginRequest } from "../../../action/user.action";

class LoginForm extends React.Component {
  state = {
    emailError: "",
    passwordError: "",
  };

  submitForm = (event) => {
    event.preventDefault();
    let email = this.refs.email.value;
    let password = this.refs.password.value;

    let validation = loginValidation({ email, password });

    let newState = {
      emailError: "",
      passwordError: "",
    };

    if (validation.error) {
      for (let error in validation.details) {
        let stateName = validation.details[error].path + "Error";
        newState[stateName] = validation.details[error].message;
      }
    } else {
      this.props.sendLoginRequest(email, password);
    }

    this.setState(newState);
  };

  render() {
    return (
      <form className="form" onSubmit={this.submitForm}>
        <div className="modal-header">
          <h1>header</h1>
          <button
            type="button"
            className="close-btn"
            onClick={this.props.closeModal}
          >
            X
          </button>
        </div>
        <div className="modal-body">
          <div className="input-wrapper">
            <label htmlFor="login-email">email</label>
            <input ref="email" name="email" id="login-email" type="text" />
            <p className="input-error">{this.state.emailError}</p>
          </div>
          <div className="input-wrapper">
            <label htmlFor="login-password">password</label>
            <input
              ref="password"
              name="password"
              id="login-password"
              type="password"
            />
            <p className="input-error">{this.state.passwordError}</p>
          </div>
          <span id= "login-error">{this.props.loginError}</span>
          <button type="submit" className="button submit-btn">
            Login
          </button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  loginError: state.user.loginError
});

const mapDispatchToProps = (dispatch) => ({
  sendLoginRequest: (email, password) =>
    dispatch(sendLoginRequest(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
