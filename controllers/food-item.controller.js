import FoodItem from '../models/food-item.model.js';
import { findAllFoodItems, findByIdAndUpdateFoodItem, findFoodItemById, saveFoodItem } from '../transaction/food-item.query.js';
import { findScreenById } from '../transaction/screen.query.js';
import logger from '../utils/logger.js';
import { createResponse } from '../utils/response.js';

export const createFoodItem = async (req, res) => {
    try {
        logger.info(`Creating food item: ${req.body.name} for screen: ${req.body.screen}`);
        const { screen, name, category, description, price, imageUrl, isAvailable } = req.body;

        const existingScreen = await findScreenById(screen);
        if (!existingScreen) {
            return res.status(404).json(createResponse('Screen not found', null, 404));
        }

        const savedFoodItem = await saveFoodItem({ screen, name, category, description, price, imageUrl, isAvailable });

        logger.info(`Food item created: ${name} for screen: ${screen}`);
        res.status(201).json(createResponse('Food item created successfully', savedFoodItem, 201));
    } catch (error) {
        logger.error(`Error creating food item: ${error.message}`);
        res.status(400).json(createResponse('Error creating food item', error.message, 400));
    }
};


export const getAllFoodItems = async (req, res) => {
    try {
        logger.info('Retrieving all food items');
        const foodItems = await findAllFoodItems();

        const populatedFoodItems = await FoodItem.populate(foodItems, { path: 'screen', select: 'name -_id' });

        logger.info(`Food items retrieved: ${foodItems.length} items found`);
        res.status(200).json(createResponse('Food items retrieved', populatedFoodItems, 200));
    } catch (error) {
        logger.error(`Error retrieving food items: ${error.message}`);
        res.status(500).json(createResponse('Error retrieving food items', error.message, 500));
    }
};

export const getFoodItemById = async (req, res) => {
    try {
        logger.info(`Retrieving food item with ID: ${req.params.id}`);
        const foodItem = await findFoodItemById(req.params.id);

        if (!foodItem) {
            return res.status(404).json(createResponse('Food item not found', null, 404));
        }

        const populatedFoodItem = await FoodItem.populate(foodItem, { path: 'screen', select: 'name -_id' });

        res.status(200).json(createResponse('Food item retrieved', populatedFoodItem, 200));
    } catch (error) {
        logger.error(`Error retrieving food item: ${error.message}`);
        res.status(500).json(createResponse('Error retrieving food item', error.message, 500));
    }
};

export const updateFoodItem = async (req, res) => {
    try {
        logger.info(`Updating food item with ID: ${req.params.id}`);
        const updateData = { ...req.body };

        delete updateData.screen;

        const updated = await findByIdAndUpdateFoodItem(req.params.id, updateData);

        if (!updated) {
            return res.status(404).json(createResponse('Food item not found', null, 404));
        }

        logger.info(`Food item updated: ${req.params.id}`);
        res.status(200).json(createResponse('Food item updated successfully', updated, 200));
    } catch (error) {
        res.status(400).json(createResponse('Error updating food item', error.message, 400));
    }
};
