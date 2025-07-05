const express = require('express');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({path: './config.env'});

app.listen(process.env.PORT, '127.0.0.1', () => {
    console.log(`Server is running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
})