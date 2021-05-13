const ProductModel = require("../models/product.model");
const mongoose = require('mongoose');


module.exports.getAllProducts = async (req, res) => {
    const products = await ProductModel.find({});
    res.status(200).json(products);
}

module.exports.addProduct = async (req, res) => {

    console.log(req.body);
    const {title, brand, model, description, cellsOrBattery, weight, size, stock, price} = req.body;

    try {
        const product = await ProductModel.create({title, brand, model, description, cellsOrBattery, weight, size, stock, price});
        res.status(201).json({ product: product._id})
    }
    catch(err) {
        res.status(200).json({ err });
    }

}

module.exports.productInfo = async (req, res) => {

    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('ID unknown : ' + req.params.id)
    }

    ProductModel.findById(req.params.id, (err, data) => {
        if (!err) {
            return res.send(data);
        } else {
            console.log('ID unknown : ' + err);
        }
    })
}


module.exports.updateProduct = async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('ID Unknown : ' + req.params.id);
    }

    try {
        let params = {};

        for(let prop in req.body) if(req.body[prop] || req.body[prop] === '') params[prop] = req.body[prop];

            
        console.log(params);

        await ProductModel.findOneAndUpdate(
            {_id: req.params.id}, 
            {
                $set: params
            }, 
            {new: true, runValidators: true}, 
            (err, data) => {

                if (!err && data !== null) {
                    return res.send(data);
                } 
                if (data === null) {
                    res.status(400).send('ID Unknown : ' + req.params.id);
                }
                else {
                    return res.status(201).json({ message: err });
                }
            }
        )


    } catch (err) {
        console.log('pwobleme');
        //return res.status(400).json({ err });
    }

}


module.exports.deleteProduct = async (req, res) => {

    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('ID Unknown : ' + req.params.id);
    }

    try {
        await ProductModel.deleteOne({_id: req.params.id}, (err, data) => {
            if (data.n !== 1) {
                return res.status(400).json({ message: data });
            } else {
                console.log(data);
                res.status(200).json({ message: "Successfully deleted. " })
            }
        }
    );

    } catch (err) {
        return res.status(400).json({ message: err });
    }

}
