// Setting up Express Server
const express = require('express');
const { MongoClient } = require('mongodb');
const userRoutes = require('./routes/userRoutes');
const PORT = process.env.PORT || 5000;
// Init app
const app = express();
// Middleware
app.use(express.json());
// Routes
app.use('/api', userRoutes);

// Connect to MongoDB
const client = new MongoClient(process.env.MONGO_URI);
async function run() {
    try {
        // Connect the client to the server
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}
    
// Function to close the MongoDB connection
async function close() {
    try {
        if (client !== null && client !== undefined) {
            await client.close();
            console.log('MongoDB connection closed');
        } else {
            console.log('MongoDB connection is already closed');
        }
    } catch (error) {
        console.error('Error closing MongoDB:', error);
    }
}

// Start the server and run the MongoDB operation
app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    await run(); // Run the MongoDB operation when the server starts

    // Handle server shutdown gracefully
    process.on('SIGINT', async () => {
        await close(); // Close the MongoDB connection on server shutdown
        process.exit(0);
    });
});

// Simple route to check if server is running
app.get('/', (req, res) => {
    res.send('API is running');
});
