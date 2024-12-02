const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const authRoutes = require('./routes/authRoutes'); // Import auth routes

dotenv.config();
connectDB();

const app = express();

// Enable CORS
app.use(cors({
    origin: 'http://localhost:3002', // Your frontend's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
}));

// Middleware to parse JSON
app.use(express.json());

// Swagger Documentation Setup
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

// Use Auth Routes
app.use('/api/auth', authRoutes); // Register the auth routes

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
