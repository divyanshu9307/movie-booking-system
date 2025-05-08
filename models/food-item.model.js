import mongoose from 'mongoose';

const FoodItemSchema = new mongoose.Schema({
    screen: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Screen',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        enum: ['Snacks', 'Beverages', 'Combos', 'Desserts'],
        required: true
    },
    description: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    imageUrl: {
        type: String,
        trim: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const FoodItem = mongoose.model('FoodItem', FoodItemSchema);

export default FoodItem;
