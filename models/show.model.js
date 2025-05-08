import mongoose from 'mongoose';

const ShowSchema = new mongoose.Schema({
    movie: {
        type: String,
        required: true,
        trim: true
    },
    screen: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Screen',
        required: true
    },
    startAt: {
        type: Date,
        required: true
    },
    language: {
        type: String,
        default: 'Hindi'
    },
    format: {
        type: String,
        enum: ['2D', '3D', 'IMAX'],
        default: '2D'
    },
    seatGroups: {
        type: [
            {
                price: {
                    type: Number,
                    required: true
                },
                seats: {
                    type: [[
                        {
                            seatNumber: {
                                type: String,
                                required: true
                            },
                            isBooked: {
                                type: Boolean,
                                default: false
                            }
                        }
                    ]],
                    required: true
                }
            }
        ],
        required: true
    }
}, {
    timestamps: true
});

const Show = mongoose.model('Show', ShowSchema);

export default Show;
