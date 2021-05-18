import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from '../utils/utils';
import ProductModal from './ProductModal';
import classNames from 'classnames';
import useModal from './useModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { addToCart } from '../actions/cart.actions';
import {Animated} from "react-animated-css";
import Background from '../images/bgImage3.jpg';



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
        <div className="container is-max-desktop box" style={{ backgroundImage: "url(" + Background + ")" }}>

            <p className="title is-4 has-text-grey-lighter">Il y a {productsData ? productsData.length : '0'} {productsData.length === 0 || productsData.length === 1 ? ' résultat' : ' résultats'} </p>

            <div className="columns is-multiline pt-2" /*style={{ height: "1000px" }}*/ >


                {
                    !isEmpty(productsData) && productsData.map( product => {


                            return (
                            <>

                            <div className="column is-4 ">
                            <div className="card has-background-info-light modal-button px-3 pt-3 is-clickable" key={product._id} onClick={() => handleModal(product._id)} /*style={{ margin: "1rem auto", maxWidth: "400px" }}*/>                            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                <div className="card-image has-background-info-danger">

                                        <img src={product.picture} alt="product photo" style={{ width: "300px", height: "280px", display: "block", margin: "0 auto"}}/>

                                </div>
                                <div className="card-content px-1 mx-1">


                                    <div className="media-content" style={{ height: "120px" }}>
                                        <p className="title is-4 mb-5" >{product.title}</p>
                                        <p className="subtitle is-6">{product.brand}</p>
                                    </div>

            
                                    <div className="is-align-content-flex-end">
                                        <p className="title is-4">{product.price} €</p>
                                        <p className="title is-4">{product.stock === 0 ? <span className="has-text-danger">Indisponible</span> :  <span className="has-text-success">En stock</span> }</p>
                                    </div>
                                </div>                             </Animated>
                            </div>
                            </div>

                            <div id={product._id} className='modal'>
                                <div className="modal-background" onClick={() => handleModal(product._id)}></div>
                                <div className="modal-card" style={{ height: "700px", margin: "1rem", width: "95%", maxWidth: "700px"}}>
                                    <header className="modal-card-head is-justify-content-space-between">
                                        <div>
                                            <p className="modal-card-title title is-5">{product.title}</p>
                                            <p className="subtitle is-6">{product.brand}</p>
                                        </div>
                                        <div className="ml-4">
                                            <p className="modal-card-title title is-7">Modèle : {product.model}</p>
                                            <p className="subtitle is-7">Référence : {product.reference}</p>
                                        </div>

                                        <button className="delete is-large" onClick={() => handleModal(product._id)} aria-label="close"></button>
                                    </header>
                                    <section className="modal-card-body columns has-background-warning-light">

                                        <div className="column is-half is-flex is-justify-content-center" >

                                            <img src={product.picture} alt="product photo" style={{ width: "300px", height: "300px"}}/>

                                        </div>
                                        <div className="column has-text-weight-semibold">
                                            
                                            <p>Description : {product.description}</p><br></br>
                                            <div>
                                                <p>Piles/Batteries : {product.cellsOrBattery}</p>
                                                <p>Poids: {product.weight} / Dimensions: {product.size}</p>
                                            </div>

                                        </div>
                                    </section>
                                    <footer className="modal-card-foot is-flex is-justify-content-flex-end ">
                                        <div className="">
                                            <h3>QUANTITY</h3>
                                            <div  className="has-background-white is-flex is-justify-content-space-around is-align-items-center is-clickable" style={{ height: '2rem', borderRadius: '35px'}}>
                                                <FontAwesomeIcon icon="minus"  onClick={ quantity >= 2 ? () => setQuantity(quantity - 1) : null }/>
                                                <span>{quantity}</span>
                                                <FontAwesomeIcon icon="plus" onClick={ () => setQuantity(quantity + 1)}/>
                                            </div>

                                        </div>
                                        
                                        <button className="button mx-4 mt-4 has-background-warning" onClick={() => addProduct(product._id, quantity)}>Ajouter au panier</button>
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