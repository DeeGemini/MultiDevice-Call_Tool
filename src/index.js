// Setting up Express Server
const express = require('express');
const { MongoClient } = require('mongodb');
const PORT = process.env.PORT || 5000;
// Init app
const app = express();
// Middleware
app.use(express.json());

// Connect to MongoDB
const client = new MongoClient("mongodb+srv://nicsadyngwenya:zA5qJpVfLRgQX5XH@cluster0.nvzsxh8.mongodb.net/?w=majority&appName=Cluster0");
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
})
