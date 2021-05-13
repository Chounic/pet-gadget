import React from 'react';
import classNames from 'classnames';

const ProductModal = ({modalOn, productData, handleModal}) => {

    const closeModal = () => {

        handleModal();
    }

    const modalClass = classNames({
        modal: true,
        'is-active': modalOn
      });

      console.log(productData.reference);

    return (
    <div key={productData.reference} className={modalClass}>
        <div className="modal-background" onClick={() => closeModal()}></div>
        <div className="modal-card" style={{ height: "600px", width: "800px", margin: "1rem"}}>
            <header className="modal-card-head is-justify-content-space-between">
                <div>
                    <p className="modal-card-title title is-5">{productData.title}</p>
                    <p className="subtitle is-6">{productData.brand}</p>
                </div>
                <div>
                    <p className="modal-card-title title is-6">Modèle : {productData.model}</p>
                    <p className="subtitle is-7">Référence : {productData.reference}</p>
                </div>

            <button className="delete is-large" onClick={() => closeModal()} aria-label="close"></button>
            </header>
            <section className="modal-card-body">
                <div>{productData.title}</div>
            </section>
            <footer className="modal-card-foot">
            <button className="button is-success">Save changes</button>
            <button className="button">Cancel</button>
            </footer>
        </div>
    </div>
    );
};

export default ProductModal;