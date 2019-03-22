var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser')


//mvc routers
const listingRouter = require('./routes/listingrouter');
app.use('/newlisting',listingRouter);


const ListingsModel = require('./models').ListingPost


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());



app.listen(5000);