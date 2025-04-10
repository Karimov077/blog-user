import Joi from "joi";


export const postSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    content: Joi.string().required(),
    authorId: Joi.string().required(),
    published: Joi.boolean().default(true),
}).required()

export const postUpdateSchema = Joi.object({
    title: Joi.string().alphanum().min(3).max(100),
    content: Joi.string(),
    authorId: Joi.string(),
    published: Joi.boolean(),
}).required()