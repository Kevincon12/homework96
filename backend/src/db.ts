import mongoose from 'mongoose';

const mongoUrl = process.env.MONGO_URL || '';

const connectDB = async () => {
    try {
        await mongoose.connect(mongoUrl);
        console.log('Connected to MongoDB');
    } catch (e) {
        console.error('MongoDB connection error', e);
        process.exit(1);
    }
};

export default connectDB;
