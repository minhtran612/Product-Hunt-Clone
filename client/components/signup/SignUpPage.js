import React from 'react';
import SignUpForm from './SignUpForm';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { userSignupRequest, isUserExists }  from '../../action/SignUpAction';
import { addFlashMessage }  from '../../action/flashMessages';

class SignUpPage extends React.Component{
    render(){
        const { userSignupRequest, addFlashMessage, isUserExists } = this.props;
        return (
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <SignUpForm isUserExists={isUserExists} 
                        userSignupRequest = {userSignupRequest} 
                        addFlashMessage = {addFlashMessage} />
                </div>
            </div>
        );
    }
}

SignUpPage.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  isUserExists: PropTypes.func.isRequired
}

export default connect(null, { userSignupRequest,addFlashMessage, isUserExists })(SignUpPage);
