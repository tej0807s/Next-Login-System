import mongoose, { Schema, models } from "mongoose";

const UserSchema = new Schema({

    nickname: { type: String, required: true },
    username: { type: String, required: true, unique: true }, // unique: true

});

const PersonalInfo = models.PersonalInfo || mongoose.model("PersonalInfo", UserSchema);

export default PersonalInfo;