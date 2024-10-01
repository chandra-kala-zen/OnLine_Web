
import mongoose, { Document, Schema, Model } from 'mongoose';

interface Images extends Document {
    Image: string;
   
}

const ImagesSchema: Schema<Images> = new Schema({
    Image: { type: String, required: true },
   
});

// Model definition
const ImagesModel: Model<Images> = mongoose.models.Products || mongoose.model<Images>('Images', ImagesSchema);

export default ImagesModel;
