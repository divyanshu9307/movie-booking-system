import User from '../models/user.model.js';

export const findUserByEmail = async (email) => {
    try {
        const match = { email };

        const projection = {
            name: 1,
            email: 1,
            role: 1,
            password: 1
        }

        return await User.findOne(match, projection);
    } catch (error) {
        logger.error(`Error finding user by email: ${error.message}`);
        throw error;
    }
}

export const saveUser = async (user) => {
    try {
        const newUser = new User(user);
        const savedUser = await newUser.save();
        return savedUser;
    } catch (error) {
        logger.error(`Error saving user: ${error.message}`);
        throw error;
    }
}