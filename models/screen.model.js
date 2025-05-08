import mongoose from 'mongoose';

const ScreenSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    totalSeats: {
        type: Number,
        required: true,
        min: 1
    },
    seatGroups: {
        type: [
            {
                name: {
                    type: String,
                    trim: true,
                },
                price: {
                    type: Number,
                    required: true,
                    min: 1
                },
                seats: {
                    type: [[String]],
                    required: true
                }
            }
        ],
        required: true
    }
}, {
    timestamps: true
});

const Screen = mongoose.model('Screen', ScreenSchema);

export default Screen;
