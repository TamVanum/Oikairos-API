const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const server = require('./app');
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}/api`);
});