import mongoose from 'mongoose';

const TicketSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    show: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Show',
        required: true
    },
    seats: [{
        seatNumber: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }],
    foodItems: [{
        foodItem: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'FoodItem'
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        totalPrice: {
            type: Number,
            required: true
        }
    }],
    voucher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Voucher'
    },
    totalAmount: {
        type: Number,
        required: true,
        min: 0
    },
    discountAmount: {
        type: Number,
        default: 0
    },
    finalAmount: {
        type: Number,
        required: true,
        min: 0
    },
    bookingDate: {
        type: Date,
        default: Date.now
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid'],
        default: 'Pending'
    },
    status: {
        type: String,
        enum: ['Booked', 'Payment_Pending', 'Cancelled'],
        default: 'Payment_Pending'
    }
}, {
    timestamps: true
});

const Ticket = mongoose.model('Ticket', TicketSchema);

export default Ticket;