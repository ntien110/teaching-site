import React,{ Component } from "react";

import "../style/header.style.css";

class Header extends Component {
  render() {
      return(
        <div className="header">
            <input className="search-bar" placeholder="search bar"/>
            <button className="button login-btn">login</button>
            <button className="button register-btn">register</button>
        </div>
      )
  }
}

export default Header
