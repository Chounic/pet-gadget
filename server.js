const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
require('./db');
const productRoutes = require('./routes/product.routes');
const path = require("path");
const PORT = process.env.PORT;




app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "client", "build")));

app.get('/', (req, res) => { res.send('Hello from Express!')});

// route
app.use('/api/product', productRoutes);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// server
app.listen( PORT, () => {
    console.log(`listening on port ${PORT}`)
});