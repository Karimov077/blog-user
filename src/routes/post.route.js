import { Router } from "express";
import postController from "../controllers/post.controller.js";
import { postSchema, postUpdateSchema } from "../Schema/post.schema.js";
import { ValidationMiddleware } from "../middleware/validations.middlewre.js";

const postRouter = Router();

postRouter.post("/", ValidationMiddleware(postSchema), postController.createPost);
postRouter.get("/", postController.getPosts);
postRouter.get("/:id", postController.getPostById);
postRouter.put("/:id", ValidationMiddleware(postUpdateSchema), postController.updatePost);
postRouter.delete("/:id", postController.deletePost);
postRouter.get("/author/:authorId", postController.getPostsByAuthor);

export default postRouter;