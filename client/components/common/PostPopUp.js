import React from 'react';
import PopUp from './PopUp';
import TextFieldGroup from '../common/TextFieldGroup';
import { connect } from 'react-redux';
import { addProduct }  from '../../action/productAction';

class PostPopup extends React.Component {
  constructor(props) {
    super(props);
     this.state = {
        product_name: '',
        product_desc: '',
        product_link: '',
        product_media: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  clearState = () => {
      this.setState({product_name: '',
          product_desc: '',
          product_link: '',
          product_media: '',
      });
  }

  onSubmit(e) {
    e.preventDefault();
    const { user } = this.props.auth;
    console.log(user.id);
    this.props.addProduct(this.state, user.id)        
    .then(() => { 
        this.clearState();
        window.location.reload();
    })
  }
  
  renderPopupContent() {
     const { product_name, product_desc, product_link, product_media } = this.state;
    return (
       <PopUp id="myPostModal">
         <form onSubmit={this.onSubmit}>
              <h1>POST A NEW PRODUCT</h1>

              <TextFieldGroup
                field="product_name"
                label="Enter product's name"
                value={product_name}
                onChange={this.onChange}
                type="text"
              />

              <TextFieldGroup
                field="product_desc"
                label="Enter product's description"
                value={product_desc}
                onChange={this.onChange}
                type="text"
              />

              <TextFieldGroup
                field="product_link"
                label="Link"
                value={product_link}
                onChange={this.onChange}
                type="text"
              />

              <TextFieldGroup
                field="product_media"
                label="Media"
                value={product_media}
                onChange={this.onChange}
                type="text"
              />
              <button type="submit" className="btn btn-lg">Post New Product</button>
          </form>    
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

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}


export default connect(mapStateToProps, { addProduct })(PostPopup);
