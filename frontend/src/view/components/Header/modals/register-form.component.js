import React from "react";
import { connect } from "react-redux";

import { registerValidation } from "../../../../helper/validation.helper.js";
import { sendRegisterRequest } from "../../../action/user.action";

class RegisterForm extends React.Component {
  state = {
    nameError: "",
    emailError: "",
    passwordError: "",
    studentIdError: ""
  };

  submitForm = (event) => {
    console.log("summited")
    event.preventDefault();
    let name = this.refs.name.value;
    let email = this.refs.email.value;
    let password = this.refs.password.value;
    let studentId = this.refs.studentId.value ? this.refs.studentId.value : undefined;

    let validation = registerValidation({ name, email, password, studentId});

    let newState = {
      nameError: "",
      emailError: "",
      passwordError: "",
      studentIdError: ""
    };

    if (validation.error) {
      for (let error in validation.details) {
        let stateName = validation.details[error].path + "Error";
        newState[stateName] = validation.details[error].message;
      }
    } else {
      console.log("sending")
      this.props.sendRegisterRequest(name, email, password, studentId);
    }

    this.setState(newState);
  };

  render() {
    return (
      <form className="form" onSubmit={this.submitForm}>
        <div className="modal-header">
          <h1>Register</h1>
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
            <label htmlFor="register-name">Name</label>
            <input ref="name" name="name" id="register-name" type="text" />
            <p className="input-error">{this.state.nameError}</p>
          </div>
          <div className="input-wrapper">
            <label htmlFor="register-email">Email</label>
            <input ref="email" name="email" id="register-email" type="text" />
            <p className="input-error">{this.state.emailError}</p>
          </div>
          <div className="input-wrapper">
            <label htmlFor="register-studentId">Student ID</label>
            <input ref="studentId" name="studentId" id="register-studentId" type="number" />
            <p className="input-error">{this.state.studentIdError}</p>
          </div>
          <div className="input-wrapper">
            <label htmlFor="register-password">Password</label>
            <input
              ref="password"
              name="password"
              id="register-password"
              type="password"
            />
            <p className="input-error">{this.state.passwordError}</p>
          </div>
          <span id= "register-error">{this.props.registerError}</span>
          <button type="submit" className="button submit-btn">
            Register
          </button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  registerError: state.user.registerError
});

const mapDispatchToProps = (dispatch) => ({
  sendRegisterRequest: (name, email, password, studentId) =>
    dispatch(sendRegisterRequest(name, email, password, studentId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
