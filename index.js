import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from './utils/logger.js';
import authRouter from './routes/auth.route.js';
import screenRouter from './routes/screen.route.js';
import { apiExecutionTime } from './middlewares/api-execution-time.js';

const app = express();

dotenv.config();

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/movieBookingSystem';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => logger.info('Connected to database successfully'))
    .catch(err => logger.error('Database connection error:', err));


app.use(express.json());
app.use(apiExecutionTime);

app.use('/auth', authRouter);
app.use('/screens', screenRouter);

app.get('/', (req, res) => {
    res.send('Home route to movie booking system!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});
