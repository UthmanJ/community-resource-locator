import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        'Clinic',
        'Hospital',
        'ICT Center',
        'Library',
        'NGO',
        'School',
        'Community Center',
        'Pharmacy',
        'Other',
      ],
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    contactPhone: {
      type: String,
      default: '',
    },
    contactEmail: {
      type: String,
      default: '',
    },
    submittedBy: {
      type: String,
      default: 'Anonymous',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Resource', resourceSchema);