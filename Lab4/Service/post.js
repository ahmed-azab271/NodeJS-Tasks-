const Post = require("../Model/post")


const createPost = async (data, userId) => 
{
  const post = await Post.create({ ...data, userId});
  return post;
};


const getAllPosts = async (query, authenticatedUserId) => 
{
  let { page = 1, limit = 10 } = query;

  page = Number(page);
  limit = Number(limit);

  const postPromise = Post.find() .populate('userId', 'name email') .skip((page - 1) * limit) .limit(limit);
  const totalPromise = Post.countDocuments();
  const [posts, total] = await Promise.all([postPromise, totalPromise]);

  const postsWithOwnerFlag = posts.map(post => 
{
    const postObj = post.toObject();
    postObj.isOwner = postObj.userId && postObj.userId._id.toString() === authenticatedUserId.toString();
    return postObj;
  });

  const pagination = { page, limit, total,
    totalPages: Math.ceil(total / limit),
  };

  return { posts: postsWithOwnerFlag, pagination };
};




const getPostById = async (id, authenticatedUserId) => 
{
    const post = await Post.findOne({ _id: id }) .populate('userId', 'name email');

    if (!post)
        return null;

    const postObj = post.toObject();

    postObj.isOwner = postObj.userId && postObj.userId._id.toString() === authenticatedUserId.toString();

    return postObj;
}



const updatePost = async (id, data, authenticatedUserId) => 
{
    const post = await Post.findOne({ _id: id });

    if (!post)
        return null;

    if (post.userId.toString() !== authenticatedUserId.toString())
        throw new APIError('You are not allowed to update this post', 403);

    const updatedPost = await Post.findOneAndUpdate( { _id: id }, data, { new: true }
    );

    return updatedPost;
}


const deletePost = async (id, authenticatedUserId) => 
{
    const post = await Post.findOne({ _id: id });

    if (!post)
        return null;

    if (post.userId.toString() !== authenticatedUserId.toString())
        throw new APIError('You are not allowed to delete this post', 403);

    const deletedPost = await Post.findOneAndDelete({ _id: id });

    return deletedPost;
}



module.exports = {createPost,getAllPosts,getPostById,updatePost,deletePost}