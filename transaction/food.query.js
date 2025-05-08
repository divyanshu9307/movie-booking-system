import FoodItem from '../models/food-item.model.js';

export const findFoodItemById = async (id) => {
    try {
        const foodItem = await FoodItem.findById(id);
        return foodItem;
    } catch (error) {
        throw error;
    }
}

export const findAllFoodItems = async () => {
    try {
        const foodItems = await FoodItem.find();
        return foodItems;
    } catch (error) {
        throw error;
    }
}

export const saveFoodItem = async (foodItemData) => {
    try {
        const foodItem = new FoodItem(foodItemData);
        const savedFoodItem = await foodItem.save();
        return savedFoodItem;
    } catch (error) {
        throw error;
    }
}

export const findByIdAndUpdateFoodItem = async (id, foodItemData) => {
    try {
        const updatedFoodItem = await FoodItem.findByIdAndUpdate(id, foodItemData, { new: true });
        return updatedFoodItem;
    } catch (error) {
        throw error;
    }
}