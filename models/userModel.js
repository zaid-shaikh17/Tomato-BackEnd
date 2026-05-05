import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minlength: [2, "Name must be at least 2 characters"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters"]
    },
    role: {
        type: String,
        enum: ["customer", "delivery"],
        default: "customer"
    }
}, { timestamps: true });

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;