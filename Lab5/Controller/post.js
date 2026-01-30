const postServices = require("../Service/post")
const APIError = require("../helpers/APIError")



const createPost = async (req,res) => 
{
    const post = await postServices.createPost(req.body,req.user.userId);
    res.status(201).json({message : "Post Created Successfully " , data:post})
}

const getAllPosts = async (req,res)=>
{
    const {posts ,pagenation}= await postServices.getAllPosts(req.query,req.user.userId)
    res.status(200).json({ message: "Posts fetched successfully", data: posts, pagenation })
}

const getPostById  = async (req , res) => 
{
    const post = await postServices.getPostById(req.params.id, req.user.userId);
    if (!post) 
       throw new APIError("Post not found" ,404)
    
    res.status(200).json({ message: "Post fetched successfully", data: post });
}

const updatedPostbyId = async (req , res) => 
{
    const updatedPost = await postServices.updatePost(req.params.id , req.body , req.user.userId); 
     if (!updatedPost) {
       throw new APIError("Post not found" ,404)
    }
    res.status(200).json({ message: "Post fetched successfully", data: updatedPost });
}

const deletePostById = async (req, res) =>
{
    const deletedpost = await postServices.deletePost(req.params.id , req.user.userId);
    if (!deletedpost) 
         throw new APIError("Post not found" ,404)
    
    res.status(200).json({ message: "Post deleted successfully" });
}


module.exports = {createPost,getPostById,getAllPosts,updatedPostbyId,deletePostById}



