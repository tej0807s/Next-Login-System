import mongoose, { Schema, models } from "mongoose";


const UserSchema = new Schema({
    fullname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    nickname: { type: String, required: true },
    email: { type: String, required: true }, // unique: true
    address: { type: String, required: true },
    nationality: { type: String, required: true },
    zipcode: { type: String, required: true },
    occupation: { type: String, required: true },
    about: { type: String, required: true },
    gender: { type: String, required: true },
    isAdmin: { type: Boolean, default: false } // Add this field
});


const User = models.User || mongoose.model("User", UserSchema)

export default User;