const User = require("../Model/user");



const createUSer = async (data)=>
{
    const user = await User.create(data);
    return user;
}

const getAllUsers = async (query)=>
{
    let { page = 1, limit = 10 } = query;
    page = parseInt(page); 
    limit = parseInt(limit);
    const userPromise = User.find({}, { password: 0 }).skip((page - 1) * limit).limit(limit);
    const totalPromise = User.countDocuments();
    const [users, total] = await Promise.all([userPromise, totalPromise]);
    const pagenation = {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
    }
    return {users , pagenation};
}

const getUserById = async (id)=>
{
    const user = await User.findOne({ _id: id }, { password: 0 });
    if (!user) 
        return null;
    
    return user;
}


const updateUserById = async (id , data)=>
{
    const updatedUser = await User.findOneAndUpdate({ _id: id }, data, { new: true });
    if (!updatedUser) 
        return null
    return updatedUser;
}


const deleteUserById = async (id)=>
{
    const deletedUser = await User.findOneAndDelete({ _id: id });
    if (!deletedUser) 
        return null;
    return deletedUser;
}



module.exports = { createUSer , getAllUsers , getUserById , updateUserById , deleteUserById }