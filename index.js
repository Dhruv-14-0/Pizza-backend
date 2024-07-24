require('dotenv').config();
const express = require('express');
const app = express();
const inject = require("@vercel/analytics/react");
const cors = require('cors');
const connection = require('./db');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const passwordResetRoutes = require('./routes/passwordReset');
const pizzasRoute = require('./routes/pizzasRoute');
const myoPizzaRoute = require('./routes/myopizza');
const paymentRoute = require('./routes/payment');
//connect database
app.use(cors());
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
inject.inject();
connection();

//middleware
app.use(express.json());

// routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/password-reset', passwordResetRoutes);
app.use('/api/pizzas', pizzasRoute);
app.use('/api/myopizza', myoPizzaRoute);
app.use('/api/payment', paymentRoute);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));
