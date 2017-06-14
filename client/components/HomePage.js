import React from 'react';
import ProductList from './ProductList'
import PostPopUp from './common/PostPopUp';
import { connect } from 'react-redux';
import { fetchProductList } from '../action/productAction';
import ReactPaginate from 'react-paginate';

class HomePage extends React.Component{
    constructor(){
        super();
        this.state = {
            productList: [],
            offset: 0,
            pageCount : 0
        }

    }
    refreshList = () => {
        this.loadProductsFromServer();
    }
    loadProductsFromServer() {
        this.props.fetchProductList(this.state.offset, this.props.limit)
        .then((data) => this.setState({productList: data.data.product, 
            pageCount: Math.ceil(data.data.meta.total_count / data.data.meta.limit
        )}));
    }
    componentDidMount(){
        this.loadProductsFromServer();
    }

    handlePageClick = (data) => {
        let selected = data.selected;
        let offset = Math.ceil(selected * this.props.limit);

        this.setState({offset: offset}, () => {
            this.loadProductsFromServer();
        });
    };
    render(){
        return (
            <section>
                <header>
                    <img src="/img/banner.jpeg" width="100%"/>
                </header> 

                <section className="product-container">
                    {
                        this.state.productList 
                        ? 
                        <div> 
                            < ProductList productList={this.state.productList} refreshList={this.refreshList}/>
                            <div className="pagination-container">
                                < ReactPaginate previousLabel={"Previous"}
                                    nextLabel={"Next"}
                                    breakLabel={<a href="">...</a>}
                                    breakClassName={"break-me"}
                                    pageCount={this.state.pageCount}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={5}
                                    onPageChange={this.handlePageClick}
                                    containerClassName={"pagination"}
                                    subContainerClassName={"pages pagination"}
                                    activeClassName={"active"} 
                                />
                            </div>
                        </div>
                        : null 
                    }
                </section>
                <PostPopUp />
            </section>
        );
    }
}

HomePage.defaultProps = {
  limit: 10
};

export default connect(null, { fetchProductList })(HomePage);