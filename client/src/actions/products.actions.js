import axios from 'axios';

export const GET_PRODUCTS = 'GET_PRODUCTS' ;


export const getProducts = () => {

    return (dispatch) => {

        return axios.get('/api/product')
        .then( res => {
            dispatch({ type: GET_PRODUCTS, payload: res.data})
        })
        .catch( err => console.log(err));
    } 
}