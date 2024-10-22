## Chatbox Application

## Overview

This project is a dynamic chatbox application built using React on the frontend and .NET (C#) on the backend. It is designed to handle user queries through an interactive interface with responses based on predefined logic. Although MongoDB is a future consideration, it is not yet implemented in this version of the application.

## Features

React Frontend: Handles user interactions and displays chat responses.
.NET (C#) Backend: Provides API endpoints to manage chat sequences and store responses.
Multiple Operators: Supports arithmetic operations in user queries.
Interactive UI: A sleek user interface with animated responses.
Emoji Support: User-friendly chat experience with emoji options.
Technologies Used
Frontend:
React ^18.3.1
Emoji Picker React ^4.11.1
Sass ^1.77.8
Backend:
.NET Core (C#)
ASP.NET Core Web API
Other Tools:
FortAwesome Icons (^6.6.0)
Web Vitals for monitoring performance
Rollup for bundling
Prerequisites
To run this project, you'll need:

Node.js: Version 14.x or later for the frontend
.NET SDK: Version 5.0 or later for the backend
MongoDB: (Optional) Planned for future versions, but not currently implemented.
Installation
Frontend (React)
Clone the frontend repository:
bash
Copy code
git clone https://github.com/your-username/my-chat-box.git
cd my-chat-box
Install the necessary dependencies:
bash
Copy code
npm install
Run the frontend development server:
bash
Copy code
npm start
By default, it runs on http://localhost:3000.
Backend (.NET)
Navigate to the backend directory:
bash
Copy code
cd ChatBoxServer
Install backend dependencies:
bash
Copy code
dotnet restore
Run the backend server:
bash
Copy code
dotnet run
By default, it runs on http://localhost:5228.
Configuration
Frontend configurations can be found in the package.json file, where the proxy for the backend is set to http://localhost:5228.
Backend configurations can be managed in the appsettings.json and appsettings.Development.json files for different environments​(appsettings)​(appsettings.Development).
Usage
Once both servers (frontend and backend) are running, users can interact with the chatbox by entering queries and receiving responses based on predefined logic.

Example Flow:
The user enters a number-based query or an arithmetic operation.
The frontend sends the request to the backend.
The backend processes the request and sends a response based on the operator selected or returns a predefined message.
