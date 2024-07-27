import mongoose from 'mongoose';

const carSchema = mongoose.Schema(
  {
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    licensePlateNumber: {
      type: String,
      required: true,
    },
    mileage: {
      type: String,
      required: true,
    },
    kilometerRun: {
      type: Number,
      required: true,
    },
    rentalRate: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['availabel', 'reserved'],
      default: 'availabel',
    },
    insuranceDetails: {
      type: String,
      required: true,
    },
    carImage: {
      type: String,
      required: true,
    },
  },
  {
    timestamp: true,
  },
);

export const Car = mongoose.model('Car', carSchema);
