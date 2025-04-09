import userModel from "../modules/user.model.js";
import jwt from "jsonwebtoken";
import { BaseException } from "../exceptions/base.exception.js";
import {hash,compare} from "bcrypt";


const registerUser = async (req, res,next) => {
    try {
        const {username, name, email, password, phoneNumber } = req.body;
        if (!username || !name || !email || !password || !phoneNumber) {
            throw new BaseException("All fields are required", 400);
        };

        const foundedUser = await userModel.findOne({email});
        if (foundedUser) {
            throw new BaseException("User already exists", 409);
        };
        const hashedPassword = await hash(password, 10);
        const newUser = new userModel({
            username,
            name,
            email,
            password: hashedPassword,
            phoneNumber,
        });
        await newUser.save();
        res.status(201).send({
            message: "User registered successfully",
            data: newUser,
        });
    } catch (error) {
        next(error);
    }
};

const loginUser = async (req,res,next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new BaseException("All fields are required", 400);
        };
        const user = await userModel.findOne({email});
        if (!user) {
            throw new BaseException("User not found", 404);
        };
        const isMatch = await compare(password, user.password);
        if (!isMatch) {
            throw new BaseException("Invalid credentials", 401);
        };
        res.status(200).send({
            message: "User logged in successfully",
            data: user,
        });
    } catch (error) {
        next(error);
    }
};

const getUsers = async (req,res,next) => {
    try {
        const users = await userModel.find();
        if (!users || users.length === 0) {
            throw new BaseException("No users found", 404);
        };
        res.status(200).send({
            message: "Users fetched successfully",
            data: users,
        });
    } catch (error) {
        next(error);
    }
};
const getUserById = async (req,res,next) => {
    try {
        const { id } = req.params;
        if (!id) {
            throw new BaseException("User ID is required", 400);
        };
        const user = await userModel.findById(id);
        if (!user) {
            throw new BaseException("User not found", 404);
        };
        res.status(200).send({
            message: "User fetched successfully",
            data: user,
        });
    } catch (error) {
        next(error);
    }
};
const updateUser = async (req,res,next) => {
    try {
        const { id } = req.params;
        const { name, email, password, phoneNumber } = req.body;
        if (!id) {
            throw new BaseException("User ID is required", 400);
        };
        const user = await userModel.findById(id);
        if (!user) {
            throw new BaseException("User not found", 404);
        };
        const updatedUser = await userModel.findByIdAndUpdate(id, {
            name,
            email,
            password,
            phoneNumber,
        }, { new: true });
        res.status(200).send({
            message: "User updated successfully",
            data: updatedUser,
        });
    } catch (error) {
        next(error);
    }
};

const deleteUser = async (req,res,next) => {
    try {
        const { id } = req.params;
        if (!id) {
            throw new BaseException("User ID is required", 400);
        };
        const user = await userModel.findById(id);
        if (!user) {
            throw new BaseException("User not found", 404);
        };
        await userModel.findByIdAndDelete(id);
        res.status(200).send({
            message: "User deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};
export default {
    registerUser,
    loginUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
};