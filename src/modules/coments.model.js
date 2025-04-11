import mongoose from "mongoose";

const commentModel = new mongoose.Schema({
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    content: {
        type: String,
        required: true,
        maxlength: 1000,
    }
}, {
    collection: "comments",
    timestamps: true,
    versionKey: false
});

export default mongoose.model("Comment", commentModel);

