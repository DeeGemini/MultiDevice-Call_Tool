### Multi-Device Call Tool

## Project Name: MultiDevice-Call_Tool
## Team Members: Solo (Nontuthuzelo Ngwenya)
## Description of the Project: 
The Multi-Device Call Tool allows users to link multiple devices (such as a mobile phone and tablets) to a single phone number. Users can register their devices,
choose which device to activate for receiving calls, and manage device registrations seamlessly. This tool aims to provide flexibility and convenience by allowing calls
to be routed to any of the registered devices based on user preference.

# Learning Objectives:
  - Understand and implement user authentication and authorization using JWT.
  - Develop a robust backend infrastructure to handle device registration and call routing.
  - Integrate third-party telephony APIs (like Twilio) for call management.
  - Ensure secure communication and data storage.
  - Implement real-time updates and push notifications.

# Technologies Used:
  * Backend: Node.js, Express
  * Database: MongoDB (Mongoose for ORM)
  * Authentication: bcryptjs for password hashing, jsonwebtoken for JWT
  * Telephony API: Twilio
  * Push Notifications: Firebase Cloud Messaging (FCM)
  * Real-time Communication: WebSocket or Socket.io

# Third-Party Services:
  - Twilio for call routing and management
  - Firebase Cloud Messaging (FCM) for push notifications

# Installation
  - Clone the repository:
    ## git clone https://github.com/DeeGemini/MultiDevice-Call_Tool.git
  - Navigate to the project directory:
    ## cd multi-device-call-tool
  - Install the dependencies:
    ## npm install
  - Create a .env file in the root directory and add your MongoDB URI and JWT secret:e
    ## MONGODB_URI=your-mongodb-uri
    ## JWT_SECRET=your-jwt-secret
  - Start the server in development mode:
    ## npm run dev

# API Endpoints
  # Authentication
    - POST /api/register: Register a new user.
    - POST /api/login: Log in with user credentials.
  # Device Management
    - GET /api/devices: Retrieve all linked devices for the authenticated user.
    - POST /api/devices: Link a new device to the user's account.
    - DELETE /api/devices/:id: Remove a linked device.
  # Call Management
    - POST /api/calls/initiate: Start a new call.
    - POST /api/calls/transfer: Transfer a call between devices.
    - POST /api/calls/end: End a call.
# Message Synchronization
    - GET /api/messages: Retrieve all synced messages.
    - POST /api/messages: Send a new message.

# File Structure
├── node_modules
├── src
|   ├── controllers
│       └── userController.js     # Handles the logic for user-related actions, e.g registering, logging in, adding new device etc.
|   ├── middleware
│       └── auth.js               # Middleware for authenticating requests
|   ├── models
│       └── User.js               # User schema and model
│       └── Device.js             # Device schema and model
|   ├── routes
│       └── userRoutes.js         # Defines the routes (URLs) for user actions
├── .env                          # Stores environment-specific configuration variables
├── index.js                      # Main entry point of the application
├── .gitignore                    # Files and directories ignored when committing to a repository
├── package-lock.json             # Locks exact versions of all dependencies used in this project
├── package.json                  # Hold metadata about the project
└── README.md                     # A detailed overview of the project

# Future Enhancements
  - Add real-time communication with WebSockets for live call status updates.
  - Implement AI-based suggestions for managing devices and call behavior.
  - Add support for video calls across multiple devices.

# Author
  - Nontuthuzelo Ngwenya
  - nicsadyngwenya@gmail.com
  - DeeGemini > GitHub

# License
This project is licensed under the MIT License.
