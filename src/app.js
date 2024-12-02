const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const exampleRoutes = require('./routes/exampleRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Routes
app.use('/api/examples', exampleRoutes);

module.exports = app;

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Node.js Backend API',
            version: '1.0.0',
            description: 'A simple CRUD API',
        },
    },
    apis: ['./src/routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
