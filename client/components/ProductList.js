import React from 'react';
import ProductItem from './ProductItem';

class ProductList extends React.Component {
  render() {
    return (
      <ul className="product-list">
        {
          this.props.productList.map( (item, idx) => {
            return <ProductItem key={idx} pid={item.id} {...item} refreshList={this.props.refreshList}/>
          })
        }
      </ul>
    );
  }
}

export default ProductList;
