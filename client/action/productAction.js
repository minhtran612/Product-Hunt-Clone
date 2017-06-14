import axios from 'axios';
import { ADD_PRODUCT_SUCCESS } from './types';

export function addProductSuccess({ data }) {
  return {
    type: 'ADD_PRODUCT_SUCCESS',
    data,
  };
}

export function addProduct(data, user_id) {
  return dispatch => {
    return axios.post('/api/product/addProduct', {data, user_id})
  }
}

export function fetchProductList(offset, limit) {
  return dispatch => {
    return axios.get(`/api/product/getProductList/?limit=${limit}&offset=${offset}`);
  }
}

export function addVoteToProduct(pid, user_id){
    return dispatch => {
      return axios.put('/api/product/addVote', {pid, user_id})
    }
}