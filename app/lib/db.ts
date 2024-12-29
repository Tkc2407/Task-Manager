import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
        console.log('MongoDB Connected');
    } catch (error: any) {
        console.error('Error connecting to database:', error.message);
        process.exit(1);
    }
};

export default connectDB;
