import Show from '../models/show.model.js';

export const findShowById = async (id) => {
    try {
        const show = await Show.findById(id);
        return show;
    } catch (error) {
        throw error;
    }
}

export const findAllShows = async () => {
    try {
        const shows = await Show.find();
        return shows;
    } catch (error) {
        throw error;
    }
}

export const saveShow = async (showData) => {
    try {
        const show = new Show(showData);
        const savedShow = await show.save();
        return savedShow;
    } catch (error) {
        throw error;
    }
}

export const findByIdAndUpdateShow = async (id, showData) => {
    try {
        const updatedShow = await Show.findByIdAndUpdate(id, showData, { new: true });
        return updatedShow;
    } catch (error) {
        throw error;
    }
}