import React from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import LoginPopUp from '../common/LoginPopUp';
import validateInput from '../../../server/shared/validation/login';
import { connect } from 'react-redux';
import { login } from '../../action/authActions';
import PropTypes from 'prop-types';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      identifier: '',
      password: '',
      errors: {},
      isLoading: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.clearState = this.clearState.bind(this);
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.login(this.state).then(
        (res) => this.context.router.history.push('/'),
        (err) => this.setState({ errors: err.response.data.errors, isLoading: false })
      );
    }
  }

  clearState(){
    this.setState({identifier: '',
      password: '',
      errors: {},
      isLoading: false,
      popupStatus: false});
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, identifier, password, isLoading } = this.state;

    return (
      <section>
          <form onSubmit={this.onSubmit}>
              <h1>Login</h1>

              { errors.form && <div className="alert alert-danger">{errors.form}</div> }

              <TextFieldGroup
                field="identifier"
                label="Username / Email"
                value={identifier}
                error={errors.identifier}
                onChange={this.onChange}
              />

              <TextFieldGroup
                field="password"
                label="Password"
                value={password}
                error={errors.password}
                onChange={this.onChange}
                type="password"
              />

              <button type="submit" className="btn btn-lg" disabled={isLoading}>Login</button>
              <button onClick={this.clearState} type="button" className="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">Login with Facebook</button>
            </form>        
            <LoginPopUp/>
      </section>
     
    );
  }
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired
}

LoginForm.contextTypes = {
  router: PropTypes.object.isRequired
}

export default connect(null, { login })(LoginForm);