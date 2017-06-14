import React from 'react';
import { connect } from 'react-redux';
import { addVoteToProduct }  from '../action/productAction';
import _ from 'lodash';

class Upvote extends React.Component {
  constructor(props){
    super(props);
  }
  handleVote = () => {
    const { user, isAuthenticated } = this.props.auth;
    if(!isAuthenticated){
      window.alert("Please Log In to Vote");
    }
    else{
      this.props.addVoteToProduct(this.props.pid, user.id).then(() => this.props.refreshList());
    }
  };
  render() {
    const debounceHandleVote = _.debounce(this.handleVote, 300);
    return (
        <button className="upvote-button" href="#" onClick={debounceHandleVote}>
          <span>
            <i className="fa fa-sort-asc"></i>
          </span>
          {this.props.upvote}
        </button>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, { addVoteToProduct })(Upvote);
