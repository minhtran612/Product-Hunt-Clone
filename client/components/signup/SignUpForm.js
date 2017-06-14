import React from 'react';
import map from 'lodash/map';
import axios from 'axios';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import validateInput from '../../../server/shared/validation/signup';
import TextFieldGroup from '../common/TextFieldGroup';

export default class SignUpForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            errors: {},
            isLoading: false,
            invalid: false
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.checkUserExists = this.checkUserExists.bind(this);
    }

    isValid(){
        const { errors, isValid } = validateInput(this.state);
        if(!isValid){
            this.setState({ errors });
        }
        return isValid;
    }
    checkUserExists(e) {
        const field = e.target.name;
        const val = e.target.value;
        if (val !== '') {
            this.props.isUserExists(val).then(res => {
                let errors = this.state.errors;
                let invalid;
                if (res.data.user) {
                    errors[field] = 'There is user with such ' + field;
                    invalid = true;
                } else {
                    errors[field] = '';
                    invalid = false;
                }
                this.setState({ errors, invalid });
            });
        }
    }

    onChange(e){
        this.setState({ [e.target.name] : e.target.value})
    }
    onSubmit(e){
        e.preventDefault();
        if(this.isValid()){
            this.setState({ errors : {}, isLoading: true, invalid: false});
            this.props.userSignupRequest(this.state)           
            .then( () => { 
                this.props.addFlashMessage({
                    type: 'success',
                    text: 'You signed up sucessfully. Welcome !!!'
                });
                this.context.router.history.push("/");
            }, (error) => {
                this.setState({ errors : error.response.data, isLoading: false, invalid: false});
            })
        }
    }

    render(){
        const { errors } = this.state;
        return (
            <form onSubmit={ this.onSubmit } >
                <h1>Join Our Community </h1>
                 <TextFieldGroup
                    error={errors.username}
                    label="Username"
                    onChange={this.onChange}
                    checkUserExists={this.checkUserExists}
                    value={this.state.username}
                    field="username"
                />
                <TextFieldGroup
                    error={errors.email}
                    label="Email"
                    onChange={this.onChange}
                    checkUserExists={this.checkUserExists}
                    value={this.state.email}
                    field="email"
                />
                <TextFieldGroup
                    error={errors.password}
                    label="Password"
                    onChange={this.onChange}
                    value={this.state.password}
                    field="password"
                    type="password"
                />
                <TextFieldGroup
                    error={errors.passwordConfirmation}
                    label="Password Confirmation"
                    onChange={this.onChange}
                    value={this.state.passwordConfirmation}
                    field="passwordConfirmation"
                    type="password"
                />
                <div className="form-group">
                    <button disabled={this.state.isLoading || this.state.invalid} className="btn btn-primary btn-lg">
                        Sign up
                    </button>
                </div>
            </form>
        );
    }
}

SignUpForm.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  isUserExists: PropTypes.func.isRequired
}

SignUpForm.contextTypes = {
  router: PropTypes.object.isRequired
}