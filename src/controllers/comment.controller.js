import Comment from "../modules/coments.model.js";
import { BaseException } from "../exceptions/base.exception.js";

const createComment = async (req, res, next) => {
    try {
        const { post_id, user_id, content } = req.body;
        if (!post_id || !user_id || !content) {
            throw new BaseException("All fields are required", 400);
        }

        const newComment = new Comment({
            post_id,
            user_id,
            content
        });

        await newComment.save();

        res.status(201).send({
            message: "Comment created successfully",
            data: newComment,
        });
    } catch (error) {
        next(error);
    }
};

const getComments = async (req, res, next) => {
    try {
        const comments = await Comment.find().populate("post_id user_id");

        if (!comments || comments.length === 0) {
            throw new BaseException("No comments found", 404);
        }

        res.status(200).send({
            message: "Comments fetched successfully",
            data: comments,
        });
    } catch (error) {
        next(error);
    }
};

const getCommentsByPost = async (req, res, next) => {
    const { post_id } = req.params;

    try {
        const comments = await Comment.find({ post_id }).populate("user_id");

        if (!comments || comments.length === 0) {
            throw new BaseException("No comments found for this post", 404);
        }

        res.status(200).send({
            message: "Comments fetched successfully",
            data: comments,
        });
    } catch (error) {
        next(error);
    }
};

const updateComment = async (req, res, next) => {
    const { comment_id } = req.params;
    const { content } = req.body;

    try {
        if (!content) {
            throw new BaseException("Content is required", 400);
        }

        const updatedComment = await Comment.findByIdAndUpdate(
            comment_id,
            { content },
            { new: true }
        );

        if (!updatedComment) {
            throw new BaseException("Comment not found", 404);
        }

        res.status(200).send({
            message: "Comment updated successfully",
            data: updatedComment,
        });
    } catch (error) {
        next(error);
    }
};

const deleteComment = async (req, res, next) => {
    const { comment_id } = req.params;

    try {
        const deletedComment = await Comment.findByIdAndDelete(comment_id);

        if (!deletedComment) {
            throw new BaseException("Comment not found", 404);
        }

        res.status(200).send({
            message: "Comment deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};

export default {
    createComment,
    getComments,
    getCommentsByPost,
    updateComment,
    deleteComment,
};
