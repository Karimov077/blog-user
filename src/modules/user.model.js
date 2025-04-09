import mongoose from "mongoose";

const userModel = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        match: [/^[a-zA-Z0-9]{3,30}$/, "Username must be alphanumeric and between 3 to 30 characters long"],
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/,],
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },

},{
    collection: "users",
    timestamps: true,
    versionKey: false,

});

export default mongoose.model("User", userModel);
