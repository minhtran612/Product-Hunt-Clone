import React from 'react';
import Upvote from './Upvote';

class ProductItem extends React.Component {
  render() {
    return (
      <li className="product-item">
        <Upvote {...this.props} refreshList={this.props.refreshList}/>
        <img className="product-item-media" src={this.props.product_media} />
        <section className="product-item-info">
          <a href="#">
            <h2>{this.props.product_name}</h2>
          </a>
          <p>{this.props.product_description}</p>
        
        </section>
        <a className="product-item-link" href={this.props.product_link}>
          <span>
            <i className="fa fa-external-link"></i>
          </span>
        </a>
      </li>
    );
  }
}

export default ProductItem;


