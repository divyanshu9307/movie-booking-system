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
git clone https://github.com/divyanshu9307/movie-booking-system.git
cd movie-booking-system
npm install
```

### Setup
Add a .env file at root of the project and add following fields.
```
PORT
MONGO_URI
JWT_SECRET
JWT_EXPIRE
```

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

## Production deployment
```
https://movie-booking-system-ohbj.onrender.com/
```

## Postman API collection
```
https://www.postman.com/flight-physicist-40840473/workspace/public-workspace/collection/23850021-8407e455-d566-480f-9f1a-d05e3a6dad89?action=share&creator=23850021
```

## 🧪 Testing

To be added (Jest / Mocha / Supertest integration can be included).