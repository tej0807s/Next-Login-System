import mongoose, { Schema, models } from "mongoose";

const UserSchema = new Schema({

    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false }

});

const SignUp = models.SignUp || mongoose.model("SignUp", UserSchema);

export default SignUp;