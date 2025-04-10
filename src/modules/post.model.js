import mongoose from "mongoose";

const postModel = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        match: [/^[a-zA-Z0-9\s]{3,100}$/, "Title must be alphanumeric and between 3 to 100 characters long"],
    },
    content: {
        type: String,
        required: true,
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    published: {
        type: Boolean,
        default: true,
    },
},{
    collection: "posts",
    timestamps: true,
    versionKey: false,
});