import mongoose from "mongoose";

const postModel = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
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

export default mongoose.model("Post", postModel);