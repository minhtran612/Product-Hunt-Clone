import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../action/authActions';

class ProfileMenu extends React.Component {
  constructor() {
    super();
    this.state = {
      showProfileNav: false
    }
  }

  handleClick = () => {
    if (this.state.showProfileNav) {
      this.setState({showProfileNav: false});
    } else {
      this.setState({showProfileNav: true});
    }
  };

  handleClickOutsite = (e) => {
    if (e.target != this.refs.profileBtn) {
      this.setState({showProfileNav: false});
    }
  };

  componentWillMount() {
    window.addEventListener("click", this.handleClickOutsite, false);
  }

  componentWillUnMount() {
    window.removeEventListener("click", this.handleClickOutsite, false);
  }

  logout(e) {
    e.preventDefault();
    this.props.logout();
  }

  renderProfileNav() {
    return (
      <nav className="profile-nav" ref="profileNav">
        <a href="#">My Profile</a>
        <a onClick={this.props.logout} href="/">Logout</a>
      </nav>
    );
  }

  render() {
    const { user } = this.props.auth;
    return (
      <div className="profile-menu">
        <a onClick={this.handleClick} className="profile-btn" ref="profileBtn"> 
            {user.username}
        </a>
        {
              this.state.showProfileNav? this.renderProfileNav() : null
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, { logout })(ProfileMenu);
