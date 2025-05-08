import bcrypt from 'bcrypt';
import { generateToken } from '../utils/authentication.js';
import logger from '../utils/logger.js';
import { createResponse } from '../utils/response.js';
import { findUserByEmail, saveUser } from '../transaction/user.query.js';

export const login = async (req, res) => {
    try {
        logger.info(`Login attempt ${req.body.email}`);
        const { email, password } = req.body;

        const user = await findUserByEmail(email);
        if (!user) {
            logger.error(`User not found ${email}`);
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            logger.error(`Invalid password for user ${email}`);
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const auth_token = generateToken(user._id, user.email, user.role);
        res.json(createResponse('Login successful', { auth_token }, 200));
    } catch (error) {
        logger.error(`Error logging in user ${error.message}`);
        res.status(500).json(createResponse('Internal server error', null, 500));
    }
}

export const register = async (req, res) => {
    try {
        logger.info(`Register attempt ${req.body.email}`);
        const { name, email, password, role } = req.body;

        const existingUser = await findUserByEmail(email);

        if (existingUser) {
            logger.error(`User already exists ${email}`);
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        saveUser({ name, email, password: hashedPassword, role });

        logger.info(`User registered successfully ${email}`);
        res.status(201).json(createResponse('User registered successfully', null, 201));
    } catch (error) {
        logger.error(`Error registering user ${error.message}`);
        res.status(500).json(createResponse('Internal server error', null, 500));
    }
}