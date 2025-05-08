import Screen from '../models/screen.model.js';

export const findScreenById = async (id) => {
    try {
        const screen = await Screen.findById(id);
        return screen;
    } catch (error) {
        throw error;
    }
}

export const findAllScreens = async () => {
    try {
        const screens = await Screen.find();
        return screens;
    } catch (error) {
        throw error;
    }
}

export const saveScreen = async (screenData) => {
    try {
        const screen = new Screen(screenData);
        const savedScreen = await screen.save();
        return savedScreen;
    } catch (error) {
        throw error;
    }
}

export const findByIdAndUpdateScreen = async (id, screenData) => {
    try {
        const updatedScreen = await Screen.findByIdAndUpdate(id, screenData, { new: true });
        return updatedScreen;
    } catch (error) {
        throw error;
    }
}