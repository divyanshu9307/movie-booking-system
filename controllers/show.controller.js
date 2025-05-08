import Show from '../models/show.model.js';
import { findScreenById } from '../transaction/screen.query.js';
import { findAllShows, findByIdAndUpdateShow, findShowById, saveShow } from '../transaction/show.query.js';
import logger from '../utils/logger.js';
import { createResponse } from '../utils/response.js';

export const createShow = async (req, res) => {
    try {
        logger.info(`Creating show for movie ${req.body.movie} on screen ${req.body.screen}`);
        const { movie, screen: screenId, startAt, language, format } = req.body;

        const screen = await findScreenById(screenId);
        if (!screen) {
            logger.error(`Screen with ID ${screenId} not found`);
            return res.status(404).json(createResponse('Screen not found', null, 404));
        }

        const showSeatGroups = screen.seatGroups.map(group => ({
            price: group.price,
            seats: group.seats.map(row =>
                row.map(seatNumber => ({
                    seatNumber,
                    isBooked: false
                }))
            )
        }));

        await saveShow({
            movie,
            screen: screenId,
            startAt,
            language,
            format,
            seatGroups: showSeatGroups
        });

        logger.info(`Show created successfully for movie ${movie} on screen ${screenId}`);
        res.status(201).json(createResponse('Show created successfully', null, 201));
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create show', error });
    }
};

export const getAllShows = async (req, res) => {
    try {
        logger.info(`Retrieving all shows`);
        const shows = await findAllShows();

        const populatedShows = await Show.populate(shows, { path: 'screen', select: 'name -_id' });

        logger.info(`Shows retrieved successfully`);
        res.status(200).json(createResponse('', populatedShows, 200));
    } catch (error) {
        logger.error(`Error retrieving shows: ${error.message}`);
        res.status(500).json(createResponse('Error retrieving shows', null, 500));
    }
};

export const getShowById = async (req, res) => {
    try {
        logger.info(`Retrieving show with ID ${req.params.id}`);
        const show = await findShowById(req.params.id);

        if (!show) {
            logger.error(`Show with ID ${req.params.id} not found`);
            return res.status(404).json(createResponse('Show not found', null, 404));
        }

        const populatedShow = await Show.populate(show, { path: 'screen', select: 'name -_id' });

        res.status(200).json(createResponse('', populatedShow, 200));
    } catch (error) {
        logger.error(`Error retrieving show: ${error.message}`);
        res.status(500).json(createResponse('Error retrieving show', null, 500));
    }
};

export const updateShow = async (req, res) => {
    try {
        logger.info(`Updating show with ID ${req.params.id}`);

        const existingShow = await findShowById(req.params.id);
        if (!existingShow) {
            logger.error(`Show with ID ${req.params.id} not found`);
            return res.status(404).json(createResponse('Show not found', null, 404));
        }

        const allowedUpdates = ['movie', 'startAt', 'language', 'format'];
        const updateData = {};

        for (const key of allowedUpdates) {
            if (req.body[key] !== undefined) {
                updateData[key] = req.body[key];
            }
        }

        if (Array.isArray(req.body.seatGroups)) {
            const updatedSeatGroups = [...existingShow.seatGroups];
            req.body.seatGroups.forEach((group, index) => {
                if (
                    group &&
                    typeof group.price === 'number' &&
                    updatedSeatGroups[index]
                ) {
                    updatedSeatGroups[index].price = group.price;
                }
            });
            updateData.seatGroups = updatedSeatGroups;
        }

        const updatedShow = await findByIdAndUpdateShow(req.params.id, updateData);

        logger.info(`Show updated successfully ${req.params.id}`);
        res.status(200).json(createResponse('Show updated successfully', updatedShow, 200));
    } catch (error) {
        logger.error(`Error updating show: ${error.message}`);
        res.status(400).json(createResponse('Error updating show', null, 400));
    }
};
