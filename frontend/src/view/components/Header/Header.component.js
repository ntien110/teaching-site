import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import LoginForm from "./modals/login-form.component";
import RegisterForm from "./modals/register-form.component";
import Modal from "../Modal/Modal.component";

import {renewAccessToken} from "../../action/user.action"

import "../../style/header.style.css";

class Header extends Component {
  loginModalRef = React.createRef();
  registerModalRef = React.createRef();

  componentDidMount(){
    this.props.renewAccessToken();
  }

  openLoginModal = () => {
    if (this.loginModalRef.current) {
      return this.loginModalRef.current.openModal();
    }
  };

  closeLoginModal = () => {
    if (this.loginModalRef.current) {
      return this.loginModalRef.current.closeModal();
    }
  };

  openRegisterModal = () => {
    if (this.registerModalRef.current) {
      return this.registerModalRef.current.openModal();
    }
  };

  closeRegisterModal = () => {
    if (this.registerModalRef.current) {
      return this.registerModalRef.current.closeModal();
    }
  };

  render() {
    return (
      <div className="header">
        <input className="search-bar" placeholder="search bar" />
        {this.props.accessToken ? (
          <div className="login-status-wrapper">
            <p className="login-status-item">{this.props.userName}</p>
            <p className="login-status-item">{this.props.role+","}</p>
          </div>
        ) : (
          <Fragment>
            <div className="login-status-wrapper">
              	<button
                	onClick={this.openLoginModal}
                	className="btn button login-btn login-status-item"
				>
                	login
              	</button>

             	<button
               		onClick={this.openRegisterModal}
                	className="btn button register-btn login-status-item"
             	>
               		register
              	</button>
            </div>

            <Modal ref={this.registerModalRef}>
              <RegisterForm closeModal={this.closeRegisterModal} />
            </Modal>
            <Modal ref={this.loginModalRef}>
              <LoginForm closeModal={this.closeLoginModal} />
            </Modal>
          </Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  accessToken: state.user.accessToken,
  userName: state.user.userName,
  role: state.user.role,
});

const mapDispatchToProps = (dispatch) => ({
  renewAccessToken: ()=>dispatch(renewAccessToken())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
