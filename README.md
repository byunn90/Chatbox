# Chatbox Application

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Frontend (React)](#frontend-react)
- [Backend (.NET)](#backend-net)
- [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## Overview

This project is a dynamic chatbox application built using **React** on the frontend and **.NET (C#)** on the backend. It is designed to handle user queries through an interactive interface with responses based on predefined logic. Although MongoDB is a future consideration, it is not yet implemented in this version of the application.

## Features

- **React Frontend**: Handles user interactions and displays chat responses.
- **.NET (C#) Backend**: Provides API endpoints to manage chat sequences and store responses.
- **Multiple Operators**: Supports arithmetic operations in user queries.
- **Interactive UI**: A sleek user interface with animated responses.
- **Emoji Support**: User-friendly chat experience with emoji options.

## Technologies Used

### Frontend:

- React `^18.3.1`
- CSS
- Emoji Picker React `^4.11.1`

### Backend:

- .NET Core (C#)
- ASP.NET Core Web API

### Other Tools:

- FortAwesome Icons (`^6.6.0`)
- Web Vitals for monitoring performance
- Rollup for bundling

## Prerequisites

To run this project, you'll need:

- **Node.js**: Version `14.x` or later for the frontend
- **.NET SDK**: Version `5.0` Currently Used
- **MongoDB**: _(Optional)_ Planned for future versions, but not currently implemented.

## Installation

Installation
Frontend (React)

1. Install Node.js: Make sure you have Node.js installed. You can verify the installation by running the following command in your terminal:
   _/ node -v /_
2. Clone the frontend repository:
   git clone git@github.com:byunn90/Chatbox.git
   _/ cd my-chat-box /_
3. Install frontend dependencies:
   _/ npm install /_

4. Run the frontend development server:
   _/ npm start /_
   By default, the app will run at http://localhost:3000.
   Backend (.NET)
   Install .NET SDK:

## Backend (.NET)

1. Ensure that the .NET SDK is installed. You can check if it's installed by running:
   _/ dotnet --version /_
2. Navigate to the backend directory:
   After ensuring that the .NET SDK is installed, navigate to the backend project:
3. Install backend dependencies:
   Run the following command to install the required .NET dependencies:
   _/ dotnet restore /_
4. Run the backend server:
   Start the backend server by running:
   _/ dotnet run /_

## Future

i'm currently working on this project slowly due to being busy with work and life commitments. More features will be added as I find time to implement them.
