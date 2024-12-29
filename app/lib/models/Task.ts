import mongoose, { Document, Schema } from 'mongoose';

interface ITask extends Document {
    userId: string;
    title: string;
    startTime: Date;
    endTime: Date;
    priority: number;
    status: 'pending' | 'finished';
}

const taskSchema = new Schema < ITask > ({
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    priority: { type: Number, enum: [1, 2, 3, 4, 5], required: true },
    status: { type: String, enum: ['pending', 'finished'], required: true },
});

export default mongoose.model < ITask > ('Task', taskSchema);
