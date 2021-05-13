const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);




const productSchema = new mongoose.Schema (
    {
        reference: {
            type: Number, 
        },  
        picture: {
            type: String, 
            default: '../images/no_image_default.png'
        }, 
        title: {
            type: String, 
            trim: true, 
            required: true
        }, 
        model: {
            type: String, 
            trim: true
        }, 
        brand: {
            type: String, 
            trim: true, 
            required: true
        }, 
        description: {
            type: String, 
            trim: true, 
            maxlength: 750,
        }, 
        cellsOrBattery: {
            type: String, 
            trim: true
        }, 
        weight: {
            type: Number
        }, 
        size: {
            type: String, 
            trim: true
        }, 
        stock: {
            type: Number, 
            min: 0
        }, 
        price: {
            type: Number, 
            min: 0, 
            required: true
        }
    }, 
    {
        timestamps: true
    }
); 

productSchema.plugin(AutoIncrement, {inc_field: 'reference', start_seq: 1000});
const ProductModel = mongoose.model('product', productSchema); 

module.exports = ProductModel;