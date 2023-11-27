import mongoose, { Schema, models } from "mongoose";

const UserSchema = new Schema({

    occupation: { type: String, required: true },
    about: { type: String, required: true },
    gender: { type: String, required: true },

});

const OtherInfo = models.OtherInfo || mongoose.model("OtherInfo", UserSchema);

export default OtherInfo;