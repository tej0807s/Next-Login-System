import mongoose, { Schema, models } from "mongoose";

const UserSchema = new Schema({

    address: { type: String, required: true },
    nationality: { type: String, required: true },
    zipcode: { type: Number, required: true },

});

const LocationInfo = models.LocationInfo || mongoose.model("LocationInfo", UserSchema);

export default LocationInfo;