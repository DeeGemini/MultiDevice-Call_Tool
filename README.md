### Multi-Device Call Tool

## Project Name: Multi-Device Call Tool
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

# Challenges Already Identified:
  - Ensuring call quality and minimal latency during redirection
  - Managing device compatibility across various platforms and operating systems
  - Handling scenarios where the selected device is offline or unavailable
  - Implementing secure authentication and communication protocols

## Schedule of Work:
# Week 1:
  * Day 1-2: Project Setup
    - Set up project environment and initialize the repository.
    - Install necessary dependencies (Node.js, Express, Mongoose, bcryptjs, jsonwebtoken, etc.).
    - Create the basic project structure with folders for models, controllers, routes, and middleware.
  * Day 3-4: User Authentication and Authorization
    - Implement user registration and login functionality using JWT.
    - Create endpoints for user registration (/register) and login (/login).
    - Set up password hashing with bcryptjs.
  * Day 5-6: Database Schema and User Model
    - Design the database schema for user and device management.
    - Implement the User model with fields for username, email, password, and devices.
  * Day 7: Testing User Management
    - Test user registration and login endpoints using Postman.
    - Verify JWT token generation and secure endpoints with authentication middleware.
# Week 2:
  * Day 8-9: Device Registration and Management
    - Implement endpoints for adding (/add-device) and removing devices (/remove-device).
    - Ensure devices are linked to the user's account in the database.
  * Day 10-11: Integrate Telephony API
    - Integrate Twilio for call routing and management.
    - Develop the logic to route calls to the selected active device.
  * Day 12-13: Push Notifications
    - Implement push notifications using Firebase Cloud Messaging (FCM) for device notifications.
    - Ensure real-time updates and notifications for incoming calls.
  * Day 14: Final Testing and Documentation
    - Perform extensive testing of all endpoints and functionalities.
    - Finalize documentation, including API endpoints and usage instructions.

# Conclusion
The Multi-Device Call Tool project aims to enhance user convenience by allowing calls to be routed to any registered device based on the user's preference.
By leveraging modern technologies and third-party services, this tool ensures reliable and efficient call management across multiple devices.Over the course of two weeks,
the project will focus on developing a robust backend that handles user authentication, device management, and call routing. Through this project, valuable skills 
in backend development, API integration, and secure communication will be gained .With a solid plan and a clear schedule, the Multi-Device Call Tool project is set
to achieve its goals within the stipulated time, providing a functional and efficient solution for multi-device call management.
