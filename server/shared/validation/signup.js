import validator from 'validator';
import _isEmpty  from 'lodash/isEmpty';

export default function validateInput(data) {
    let errors = {};
    if (validator.isEmpty(data.username ? data.username : '')) {
        errors.username = 'This field is required';
    }
    if (validator.isEmpty(data.email ? data.email : '')) {
        errors.email = 'This field is required';
    } 
    if (!validator.isEmail(data.email ? data.email : '')) {
        errors.email = 'Email is invalid';
    }
    if (validator.isEmpty(data.password ? data.password : '')) {
        errors.password = 'This field is required';
    }
    if (validator.isEmpty(data.passwordConfirmation ? data.passwordConfirmation : '')) {
        errors.passwordConfirmation = 'This field is required';
    }
    
    if(data.password && data.passwordConfirmation){
        if (!validator.equals(data.password, data.passwordConfirmation)) {
            errors.passwordConfirmation = 'Passwords must match';
        }
    }
    return {
        errors,
        isValid: _isEmpty(errors)
    }
}
