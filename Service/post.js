const Post = require("../Model/post")




const createPost = async (data) =>
{
    const post = await Post.create(data)
    return post
}

const getAllPosts = async (query) => 
{
    let {page = 1, limit = 10} = query
    page = Number(page)
    limit = Number(limit) 
    const postPromise = Post.find({}, { password: 0 }).skip((page - 1) * limit).limit(limit);
    const totalPromise = Post.countDocuments();
    const [posts, total] = await Promise.all([postPromise, totalPromise]);
    const pagination = {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
    }

    return {posts , pagination}
}


const getPostById = async (id) => 
{
    const post = await Post.findOne({_id : id}, { password: 0 })
     if (!post) 
        return null;
    return post 
}


const updatePost = async (id,data) => 
{
    const updatedPost = await Post.findOneAndUpdate({_id:id},data , {new : true})
    if (!updatedPost) 
        return null;
    return updatedPost 
}


const deletePost = async (id,data) => 
{
    const deletedPost = await Post.findOneAndDelete({_id:id})
    if (!deletedPost) 
        return null;
    return deletedPost 
}


module.exports = {createPost,getAllPosts,getPostById,updatePost,deletePost}