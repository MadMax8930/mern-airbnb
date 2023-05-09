const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
   user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
   place: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Place' },
   checkIn: { type: Date, required: true },
   checkOut: { type: Date, required: true },
   numOfGuests: Number,
   name: { type: String, required: true },
   phone: { type: String, required: true },
   price: Number,
});

const BookingModel = mongoose.model('Booking', BookingSchema);

module.exports = BookingModel;