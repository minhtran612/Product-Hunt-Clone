import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../action/authActions';
import PropTypes from 'prop-types';
import ProfileMenu from './ProfileMenu';

class NavigationBar extends React.Component {

  renderProductSearch(){
      return(
        <section className="left-side">
            <input type="search" className="product-search" placeholder="SEARCH"/>
        </section>
      )
  }

  renderLogo(){
    return(
        <Link className="favicon" to="/"><img src="/img/favicon.ico"/></Link>
    )
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    const userLinks = (
        <section className="right-side">
            <button className="post-btn" type="button" data-toggle="modal" data-target="#myPostModal">Post</button>
            <ProfileMenu/>
        </section>
    );

    const guestLinks = (
        <section className="right-side">
            <Link className="login-btn" to="/signup">Sign Up</Link>
            <Link className="login-btn" to="/login">Login</Link>
        </section>
    );

    return (
        <section>
            <section className="navbar">
                    {this.renderProductSearch()}
                    {this.renderLogo()}
                    { isAuthenticated ? userLinks : guestLinks }
            </section>
        </section>
    );
  }
}

NavigationBar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, { logout })(NavigationBar);