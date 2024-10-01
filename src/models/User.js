import mongoose from "mongoose";
const { Schema } = mongoose;
const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: false,
    },
}, { timestamps: true });

// Correct usage of mongoose.model
export default mongoose.models.User || mongoose.model("User", userSchema);
