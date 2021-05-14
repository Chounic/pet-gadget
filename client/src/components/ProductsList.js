import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from '../utils/utils';
import ProductModal from './ProductModal';
import classNames from 'classnames';
import useModal from './useModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { addToCart } from '../actions/cart.actions';



const ProductsList = () => {


    const productsData = useSelector(state => state.productsReducer);
    const [isShowing, setisShowing] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();

    //console.log(productsData.length);

    const handleModal = (id) => {

        setisShowing(!isShowing);
        setQuantity(1);
        console.log(id);
        document.getElementById(id).className = classNames({
        modal: true, 
        'is-active': !isShowing
        });
        document.documentElement.className = classNames({
            'is-clipped': !isShowing
        });

    }; 

    const addProduct = (id, quantity) => {
        console.log(id);
        console.log(quantity);
        dispatch(addToCart(id, quantity));
        handleModal(id);
    };




    return (
        <div className="container has-background-success-light is-max-desktop box">

            <h1>Il y a {productsData ? productsData.length : '0'} {productsData.length === 0 || productsData.length === 1 ? ' résultat' : ' résultats'} </h1>

            <div className="columns is-centered is-multiline" /*style={{ height: "1000px" }}*/>


                {
                    !isEmpty(productsData) && productsData.map( product => {


                            return (
                            <>
                            {/* 
                            modalOn && <ProductModal modalOn={modalOn} productData={product} handleModal={closeModal}/> 
                            */}
                            <div className="card column is-5 has-background-info-light modal-button" key={product._id} onClick={() => handleModal(product._id)} style={{ height: "500px", margin: "1rem"}}>
                                <div className="card-image">

                                        <img src={product.picture} alt="product photo" style={{ width: "350px", height: "350px"}}/>

                                </div>
                                <div className="card-content is-flex">


                                    <div className="media-content">
                                        <p className="title is-4 mb-5">{product.title}</p>
                                        <p className="subtitle is-6">{product.brand}</p>
                                    </div>

            
                                    <div className="is-align-content-flex-end has-background-warning-light">
                                        <p className="title is-4">{product.price} €</p>
                                        <p className="title is-4">En stock</p>
                                    </div>
                                </div> 
                            </div>

                            <div id={product._id} className='modal'>
                                <div className="modal-background" onClick={() => handleModal(product._id)}></div>
                                <div className="modal-card" style={{ height: "700px", width: "800px", margin: "1rem"}}>
                                    <header className="modal-card-head is-justify-content-space-between">
                                        <div>
                                            <p className="modal-card-title title is-5">{product.title}</p>
                                            <p className="subtitle is-6">{product.brand}</p>
                                        </div>
                                        <div className="ml-6">
                                            <p className="modal-card-title title is-6">Modèle : {product.model}</p>
                                            <p className="subtitle is-7">Référence : {product.reference}</p>
                                        </div>

                                        <button className="delete is-large" onClick={() => handleModal(product._id)} aria-label="close"></button>
                                    </header>
                                    <section className="modal-card-body is-flex columns">

                                        <div className="card-image has-background-danger-dark column is-half" >

                                            <img src={product.picture} alt="product photo" style={{ width: "400px"}}/>

                                        </div>
                                        <div className="has-background-success-dark column">
                                            
                                            <p>Description : {product.description}</p><br></br>
                                            <div>
                                                <p>Piles/Batteries : {product.cellsOrBattery}</p>
                                                <p>Poids: {product.weight} / Dimensions: {product.size}</p>
                                            </div>

                                        </div>
                                    </section>
                                    <footer className="modal-card-foot">
                                        <div className="has-background-warning">
                                            <h3>QUANTITY</h3>
                                            <div  className="has-background-white is-flex is-justify-content-space-around is-align-items-center" style={{ height: '2rem'}}>
                                                <FontAwesomeIcon icon="minus"  onClick={ quantity >= 2 ? () => setQuantity(quantity - 1) : null }/>
                                                <span>{quantity}</span>
                                                <FontAwesomeIcon icon="plus" onClick={ () => setQuantity(quantity + 1)}/>
                                            </div>

                                        </div>
                                        
                                        <button className="button" onClick={() => addProduct(product._id, quantity)}>Ajouter au panier</button>
                                    </footer>
                                </div>
                            </div>


                            </>

                        
                            
                            )
                        
                        
                    })
                }



            </div>
        </div>
    );
};

export default ProductsList;