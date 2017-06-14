import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import FlashMessage from './FlashMessage';
import { deleteFlashMessage }  from '../../action/flashMessages';

class FlashMessageList extends React.Component{
    render(){
        const flashMessages = this.props.messages.map(message => 
            <FlashMessage key={message.id} message = {message} deleteFlashMessage ={this.props.deleteFlashMessage}/>
        );
        return (
            <div>{flashMessages}</div>
        );
    }
}

function mapStateToProps(state){
    return {
        messages: state.flashMessages
    }
}

FlashMessageList.propTypes = {
  messages: PropTypes.array.isRequired,
  deleteFlashMessage: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { deleteFlashMessage })(FlashMessageList);
