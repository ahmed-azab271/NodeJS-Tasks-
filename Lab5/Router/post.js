const express = require("express");
const postController = require("../Controller/post");
const authenticate = require("../middlewares/authenticate");
const validate = require("../middlewares/validate");
const schemas = require("../validations/post.validation");

const route = express.Router();

route.use(authenticate);

route.post(  "/", validate(schemas.createPost), postController.createPost);
route.get( "/",validate(schemas.getAllPosts), postController.getAllPosts);
route.get("/:id", postController.getPostById);
route.patch("/:id", validate(schemas.updatePost), postController.updatedPostbyId);
route.delete("/:id", postController.deletePostById);



module.exports = route;

