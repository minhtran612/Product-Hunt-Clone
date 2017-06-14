import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class FlashMessage extends React.Component{
    constructor(props){
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(){
        this.props.deleteFlashMessage(this.props.message.id);
    }

    render(){
        const { id, type, text } = this.props.message;
        return (
            <div className={classnames('alert',{
                'alert-success': type === 'success',
                'alert-danger': type === 'error' 
                })} >
                {text}
                <button onClick={this.onClick} className="close"><span>&times;</span></button>
            </div>
        );
    }
}

FlashMessage.propTypes = {
  message: PropTypes.object.isRequired,
  deleteFlashMessage: PropTypes.func.isRequired
}


