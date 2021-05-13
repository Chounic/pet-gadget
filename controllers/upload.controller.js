const ProductModel = require('../models/product.model');
const fs = require('fs');
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline);


module.exports.uploadProduct = async (req, res) => {
    try {
        if (req.file.detectedMimeType !== "image/jpg" && req.file.detectedMimeType !== "image/png" && req.file.detectedMimeType !== "image/jpeg") {
            throw Error("invalid file");
        }
        if (req.file.size > 500000) {
            throw Error('max size');
        }
    } catch (err) {

        return res.status(201).json(err);
    }

    const fileName = req.body.reference + ".jpg";

    await pipeline(
        req.file.stream, 
        fs.createWriteStream(
            `${__dirname}/../client/public/uploads/products/${fileName}`
        )
    );

    try {
        await ProductModel.findByIdAndUpdate(
            req.body.productId, 
            { $set : { picture: "./uploads/products/" + fileName }}, 
            { new: true, upsert: true, setDefaultsOnInsert: true}, 
            (err, data) => {
                if (!err) {
                    return res.send(data);
                } else {
                    return res.status(500).send({ message: err });
                }
            }
        );
    } catch (err) {
        return res.status(500).send({ message: err });
    }
}