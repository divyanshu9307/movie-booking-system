import { createResponse } from '../utils/response.js';
import { verifyToken } from '../utils/authentication.js';

export const authMiddleware = (allowedRoles) => {
    return (req, res, next) => {
        const token = req.header('Authorization')?.split(' ')[1];

        if (!token) {
            return res.status(401).json(createResponse('No token provided', null, 401));
        }

        const decoded = verifyToken(token);

        if (!decoded) {
            return res.status(401).json(createResponse('Invalid or expired token', null, 401));
        }

        if (!allowedRoles.includes(decoded.role)) {
            return res.status(403).json(createResponse('Access denied', null, 403));
        }

        req.user = decoded;
        next();
    };
};