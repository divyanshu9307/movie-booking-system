# movie-booking-system

A simple movie booking REST API servier built with Node.js.

## 📦 Features

- ✅ Express.js server  
- ✅ RESTful API structure  
- ✅ Environment-based configuration
- ✅ Basic logging
- ✅ Modular routing  

## 🚀 Getting Started

### Prerequisites

- Node.js (v17 or later)  
- npm or yarn  

### Installation

```bash
git clone https://github.com/yourusername/express-app.git
cd express-app
npm install
```

### Setup
Add a .env file at root of the project and add following fields.
PORT
MONGO_URI
JWT_SECRET
JWT_EXPIRE

### Running the App
```bash
npm start
```

The server will start on `http://localhost:3000` by default (or the port set in `.env`).

## 📁 Project Structure

```
express-app/
├── routes/            # Route definitions
├── controllers/       # Request handlers
├── middlewares/       # Custom middlewares
├── models/             # Collections schemas
├── transaction/       # DB queries
├── utils/             # Utility functions
├── constants/         # constant values
├── index.js          # Server entry point
└── .env               # Environment variables
```

## 🛠️ Available Scripts

- `npm start` - Run the app in production mode  

## 🧪 Testing

To be added (Jest / Mocha / Supertest integration can be included).