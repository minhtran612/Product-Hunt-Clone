import React from 'react';
import PopUp from './PopUp';

class LoginPopup extends React.Component {
  renderPopupContent() {
    return (
      <PopUp id="myModal">
        <img className="img-login" src="/img/kitty.png" />
        <br/>
        <br/>
        <p className="login-text">CodeHunt is a Community to share and geek out about the latest code, podcast and news. Join us now</p>
        <br/>
        <button className="facebook-btn">Login with Facebook</button>
        <br/>
        <p className="login-text">We'll never post to Facebook without your permission.</p>
      </PopUp>
    );
  }

  render() {
    return (
      <div >
        {
          this.renderPopupContent()
        }
      </div>
    );
  }
}

export default LoginPopup;
