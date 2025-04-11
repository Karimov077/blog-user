import { Router } from "express";
import commentController from "../controllers/comment.controller.js";

const comentRouter = Router();

comentRouter.get("/", commentController.getComments);
comentRouter.post("/", commentController.createComment);

export default comentRouter;
