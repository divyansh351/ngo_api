const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
// const donorRoutes = require('./routes/donor');
// const agentRoutes = require('./routes/agent');
// const adminRoutes = require('./routes/admin');
const productRoutes = require('./routes/product');


const dbUrl = "mongodb://127.0.0.1:27017/ngo_api";
const port = 3000;

mongoose.connect(dbUrl)
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("connection open!!!!")
})

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(methodOverride('_method'))


// app.use('/donor', donorRoutes)
app.use('/product', productRoutes)
// app.use('/agent', agentRoutes)
// app.use('/admin', adminRoutes)


app.get('/', (req, res) => {
    res.json({ "home": "home" });
})



app.listen(port, () => {
    console.log(`Serving on port ${port}`)
})