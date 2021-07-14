import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../images/chienLogo.png';
import basket from '../images/shopping_cart_icon.png';
import { isEmpty } from '../utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { addQuantity, removeFromCart, subtractQuantity } from '../actions/cart.actions';
import { Animated } from "react-animated-css";
import Background from '../images/bgImage4.jpg';


const Navbar = () => {


    const [isShowing, setisShowing] = useState(false);
    const [totalPrice, setTotalPrice] = useState();
    const [totalQuantity, setTotalQuantity] = useState();
    const cartData = useSelector(state => state.cartReducer);
    const productsData = useSelector(state => state.productsReducer);
    const dispatch = useDispatch();


    const handleModal = () => {


        setisShowing(!isShowing);

        document.getElementById('cartModal').className = classNames({
            modal: true,
            'is-active': !isShowing
        });
        document.documentElement.className = classNames({
            'is-clipped': !isShowing
        });

    }

    const removeItem = (id) => {

        dispatch(removeFromCart(id))

    }



    useEffect(() => {



        let sumQuantities = 0;
        let sumValues = 0;
        if (cartData[0]) {

            if (productsData[0]) {

                for (const item of cartData) {

                    sumQuantities += item.quantity;

                    let itemData = productsData.filter(product => product._id === item.id);
                    let itemPrice = itemData[0].price;
                    let subTotal = item.quantity * itemPrice;
                    sumValues += subTotal;
                }
            }

        }

        setTotalPrice(sumValues);
        setTotalQuantity(sumQuantities);

    }, [cartData], [productsData], [isShowing]);


    return (
        <>

            <div className="columns multiline has-background-warning-light box is-variable is-2" style={{ backgroundImage: "url(" + Background + ")" }}>

                <div className="column mt-4 pt-6 is-flex is-justify-content-center ">
                    <Animated animationIn="bounce" animationOut="fadeOut" isVisible={true}>
                        <div className="circle">

                            <div className="columns">
                                <img src={logo} alt="logoImage" id="logoImage" />
                            </div>
                            <div className="is-flex is-flex-direction-column is-align-items-center">
                                <h1 className="cloudyFont title is-3 is-size-2-fullhd has-text-grey-light is-uppercase has-text-weight-bold">Pet gadget</h1>
                                <h3 className="subtitle is-7 is-size-6-fullhd has-text-grey has-text-weight-normal">C'est très cher et y'a pas pire...</h3>
                            </div>

                        </div>
                    </Animated>
                </div>

                <div className="cloudyFont is-flex is-justify-content-center ml-3">
                    <Animated animationIn="bounce" animationOut="fadeOut" isVisible={true}>
                        <h1 className="title is-2 is-size-1-tablet mt-6 pt-5"><span className="textTitle" >accessoires pour animaux</span></h1>
                    </Animated>
                </div>


                <div className="column is-flex is-align-items-center is-justify-content-center ml-3 mt-6" style={{ minWidth: "150px" }}>

                    <Animated animationIn="bounce" animationOut="fadeOut" isVisible={true}>
                        <img src={basket} alt="basket_icon" className="columns mr-4 is-clickable" onClick={totalQuantity !== 0 ? () => handleModal() : null} style={{ width: "150px" }} />
                    </Animated>
                    {totalQuantity !== 0 && <h1 className="title is-1"><span className="totalQuantity" >{totalQuantity}</span></h1>}

                </div>


            </div>


            <div id='cartModal' className='modal' style={{}}>
                <div className="modal-background" onClick={() => handleModal()}></div>
                <div className="modal-card" id="cart" style={{ margin: "1rem", width: "97%", maxWidth: "900px" }}>
                    <header className="modal-card-head is-justify-content-space-between">
                        <div>
                            <h1 className="modal-card-title title is-3">Panier</h1>
                        </div>

                        <button className="delete is-large" onClick={() => handleModal()} aria-label="close"></button>
                    </header>
                    <section className="modal-card-body has-background-light">

                        {

                            !isEmpty(cartData) && cartData.map(item => {

                                if (!isEmpty(productsData)) {

                                    const cartItem = productsData.filter(product => {

                                        return product._id === item.id;

                                    })[0];



                                    return (

                                        <div key={item.id} className="message is-dark" >
                                            <div className="message-body has-background-grey-lighter columns is-flex-tablet is-justify-content-space-between">
                                                <div className="is-flex column" style={{ height: "150px" }}>

                                                    <div className="card-image is-flex is-align-items-center">
                                                        <img src={cartItem.picture} alt="product photo" style={{ width: "50px" }} />
                                                    </div>
                                                    <div className="ml-3">
                                                        <p>{cartItem.title}</p>
                                                        <p>{cartItem.brand}<span>{cartItem.model}</span></p>
                                                        <p>Ref: {cartItem.reference}</p>
                                                    </div>

                                                </div>

                                                <div className="is-flex is-justify-content-flex-start is-5 column px-0">

                                                    <div>

                                                        <h3 className="has-text-weight-semibold">QUANTITE</h3>
                                                        <div className="has-background-white is-flex is-justify-content-space-around is-align-items-center is-clickable" style={{ height: '2rem', borderRadius: '35px' }}>
                                                            <FontAwesomeIcon icon="minus" onClick={item.quantity >= 2 ? () => dispatch(subtractQuantity(item.id)) : () => removeItem(item.id)} />
                                                            <span>{item.quantity}</span>
                                                            <FontAwesomeIcon icon="plus" onClick={() => dispatch(addQuantity(item.id))} />
                                                        </div>

                                                    </div>
                                                    <div className="mx-2">

                                                        <h3 className="has-text-weight-semibold">SUPPRIMER</h3>
                                                        <FontAwesomeIcon className="is-block is-clickable" color="red" style={{ margin: "6 auto 0" }} icon="trash-alt" onClick={() => removeItem(item.id)} />

                                                    </div>
                                                    <div>

                                                        <h3 className="subTotal mt-4 is-family-code is-size-4 has-text-black-bis " >{cartItem.price * item.quantity} €</h3>
                                                    </div>

                                                </div>

                                            </div>
                                        </div>

                                    )
                                }
                            })


                        }


                    </section>
                    <footer className="modal-card-foot">
                        <div>
                            <p className="title is-4 ">Total : <span className="has-text-danger-dark title is-3 ">{totalPrice} €</span></p>
                        </div>

                        <button className="button ml-2 has-background-warning has-text-weight-bold">Valider la commande</button>
                    </footer>
                </div>
            </div>

        </>
    );


};

export default Navbar;