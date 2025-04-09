import { Router } from "express";
import userController from "../controllers/user.controller.js";
import { loginSchema,registerSchema } from "../Schema/user.schema.js";
import { ValidationMiddleware } from "../middleware/validations.middlewre.js";

const userRouter = Router();

userRouter.post("/register", ValidationMiddleware(registerSchema), userController.registerUser);
userRouter.post("/login", ValidationMiddleware(loginSchema), userController.loginUser);
userRouter.get("/", userController.getUsers);
userRouter.get("/:id", userController.getUserById);
userRouter.put("/:id", userController.updateUser);
userRouter.delete("/:id", userController.deleteUser);

export default userRouter;