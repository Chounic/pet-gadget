import { ADD_QUANTITY, ADD_TO_CART, REMOVE_FROM_CART, SUB_QUANTITY } from "../actions/cart.actions";


const initialState = [];

export default function cartReducer( state = initialState, action) {
    switch (action.type) {
        case ADD_TO_CART: 
        
            if (state.length === 0 ) {

                return [action.payload];

            } else {
                
                const productIds = [...state].map( product => product.id);
                console.log(productIds);
                if ( !productIds.includes(action.payload.id) ){
                    
                    return [...state, action.payload] ;
                } else {

                    return [...state].map( product => {
                        if (product.id === action.payload.id) {
                            console.log('test');
                             return {
                                 id: product.id, 
                                 quantity: product.quantity + action.payload.quantity
                                };
                        } else {
                            return product ;
                        }
                    })
                }

            };

        case REMOVE_FROM_CART: 

            return [...state].filter( product => product.id !== action.payload ) ;

        case SUB_QUANTITY: 

            return [...state].map( product => {
                if (product.id === action.payload) {
                    console.log('test');
                     return {
                         id: product.id, 
                         quantity: product.quantity - 1
                        };
                } else {
                    return product ;
                }
            }) ;

        case ADD_QUANTITY: 

            return [...state].map( product => {
                if (product.id === action.payload) {
                    console.log('test');
                     return {
                         id: product.id, 
                         quantity: product.quantity + 1
                        };
                } else {
                    return product ;
                }
            }) ;


        default: 
            return state;

    }
};
