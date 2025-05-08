import mongoose from 'mongoose';

const VoucherSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    discountType: {
        type: String,
        enum: ['Percentage', 'Fixed'],
        required: true
    },
    discountValue: {
        type: Number,
        required: true,
        min: 0
    },
    minBookingAmount: {
        type: Number,
        default: 0
    },
    validFrom: {
        type: Date,
        required: true
    },
    validUntil: {
        type: Date,
        required: true
    },
    usageLimit: {
        type: Number,
        default: 1
    },
    usedCount: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['Active', 'Expired', 'Used', 'Inactive'],
        default: 'Active'
    }
}, {
    timestamps: true
});

const Voucher = mongoose.model('Voucher', VoucherSchema);

export default Voucher;
