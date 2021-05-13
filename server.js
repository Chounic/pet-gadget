const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
require('./db');
const productRoutes = require('./routes/product.routes');
const PORT = process.env.PORT;


app.use(bodyParser.json());


app.use('/api/product', productRoutes);

app.listen( PORT, () => {
    console.log(`listening on port ${PORT}`)
});