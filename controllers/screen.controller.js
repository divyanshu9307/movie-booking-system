import { findAllScreens, findByIdAndUpdateScreen, findScreenById, saveScreen } from "../transaction/screen.query.js";
import logger from "../utils/logger.js";
import { createResponse } from "../utils/response.js";

export const createScreen = async (req, res) => {
    try {
        logger.info(`Creating screen ${req.body.name}`);
        const screenData = req.body;
        await saveScreen(screenData);

        logger.info(`Screen created successfully ${screenData.name}`);
        res.status(201).json(createResponse('Screen created successfully', null, 201));
    } catch (error) {
        logger.error(`Error creating screen ${error.message}`);
        res.status(500).json(createResponse('Internal server error', null, 500));
    }
};

export const getAllScreens = async (req, res) => {
    try {
        logger.info(`Retrieving all screens`);
        const screens = await findAllScreens();

        logger.info(`Screens retrieved successfully`);
        res.status(200).json(createResponse('', screens, 200));
    } catch (error) {
        logger.error(`Error retrieving screens ${error.message}`);
        res.status(500).json(createResponse('Error retrieving screens', null, 500));
    }
};

export const getScreenById = async (req, res) => {
    try {
        logger.info(`Retrieving screen with ID ${req.params.id}`);
        const screen = await findScreenById(req.params.id);
        if (!screen) {
            logger.error(`Screen with ID ${req.params.id} not found`);
            res.status(404).json(createResponse('Screen not found', null, 404));
        }

        logger.info(`Screen retrieved successfully ${req.params.id}`);
        res.status(200).json(createResponse('', screen, 200));
    } catch (error) {
        logger.error(`Error retrieving screen ${error.message}`);
        res.status(500).json(createResponse('Error retrieving screen', null, 500));
    }
};

export const updateScreen = async (req, res) => {
    try {
        logger.info(`Updating screen with ID ${req.params.id}`);
        const updatedScreen = await findByIdAndUpdateScreen(req.params.id, req.body);
        if (!updatedScreen) {
            res.status(404).json(createResponse('Screen not found', null, 404));
        }
        res.status(200).json(createResponse('Screen updated successfully', updatedScreen, 200));
    } catch (error) {
        logger.error(`Error updating screen ${error.message}`);
        res.status(400).json({ message: 'Error updating screen', error });
    }
};