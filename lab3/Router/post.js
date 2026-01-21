const express = require("express")
const postController = require("../Controller/post")


const route = express.Router()


route.post("/" , postController.createPost )
route.get("/" , postController.getAllPosts)
route.get("/:id" , postController.getPostById )
route.patch("/:id" , postController.updatedPostbyId)
route.delete("/:id" , postController.deletePostById )


module.exports = route