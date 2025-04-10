import postModel from "../modules/post.model.js";
import { BaseException } from "../exceptions/base.exception.js";


const createPost = async (req, res, next) => {
    try {
        const { title, content, authorId,published } = req.body;
        if (!title || !content || !author) {
            throw new BaseException("All fields are required", 400);
        };
        const newPost = new postModel({
            title,
            content,
            authorId,
            published,
        });
        await newPost.save();
        res.status(201).send({
            message: "Post created successfully",
            data: newPost,
        });
    } catch (error) {
        next(error);
    }
};

const getPosts = async (req, res, next) => {
    try {
        const posts = await postModel.find().populate("authorId")
        res.status(200).send({
            message: "Posts fetched successfully",
            data: posts,
        });
    } catch (error) {
        next(error);
    }
};
const getPostById = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            throw new BaseException("Post ID is required", 400);
        };
        const post = await postModel.findById(id).populate("authorId");
        if (!post) {
            throw new BaseException("Post not found", 404);
        };
        res.status(200).send({
            message: "Post fetched successfully",
            data: post,
        });
    } catch (error) {
        next(error);
    }
};

const updatePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, content, authorId,published } = req.body;
        if (!id) {
            throw new BaseException("Post ID is required", 400);
        };
        if (!title || !content || !authorId) {
            throw new BaseException("All fields are required", 400);
        };
        const post = await postModel.findByIdAndUpdate(id, {
            title,
            content,
            authorId,
            published,
        }, { new: true });
        if (!post) {
            throw new BaseException("Post not found", 404);
        };
        res.status(200).send({
            message: "Post updated successfully",
            data: post,
        });
    } catch (error) {
        next(error);
    }
};

const deletePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            throw new BaseException("Post ID is required", 400);
        };
        const post = await postModel.findByIdAndDelete(id);
        if (!post) {
            throw new BaseException("Post not found", 404);
        };
        res.status(200).send({
            message: "Post deleted successfully",
            data: post,
        });
    } catch (error) {
        next(error);
    }
};
const getPostsByAuthor = async (req, res, next) => {
    try {
        const { authorId } = req.params;
        if (!authorId) {
            throw new BaseException("Author ID is required", 400);
        };
        const posts = await postModel.find({ authorId }).populate("users")
        if (!posts) {
            throw new BaseException("Posts not found", 404);
        };
        res.status(200).send({
            message: "Posts fetched successfully",
            data: posts,
        });
    } catch (error) {
        next(error);
    }
};

export default {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost,
    getPostsByAuthor,
}