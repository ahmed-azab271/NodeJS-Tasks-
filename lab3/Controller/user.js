const userServices = require("../Service/user");
const APIError = require("../helpers/APIError")

const createUser = async (req, res) => 
{
    const user = await userServices.createUSer(req.body);
    res.status(200).json({ message: "User created successfully", data: user })
}


const getAllUsers = async (req, res) =>
{
    const { users, pagenation } = await userServices.getAllUsers(req.query);
    res.status(200).json({ message: "Users fetched successfully", data: users, pagenation })
}


const getUserById = async (req, res) =>
{
    const user = await userServices.getUserById(req.params.id);
    if (!user) 
         throw new APIError("User not found" ,404)
        
    res.status(200).json({ message: "User fetched successfully", data: user });
}


const updateUserById = async (req, res) =>
{
    const updatedUser = await userServices.updateUserById(req.params.id , req.body);
    if (!updatedUser) 
       throw new APIError("User not found" ,404)

    res.status(200).json({ message: "User updated successfully", data: updatedUser });
}

const deleteUserById = async (req, res) =>
{
    const deletedUser = await userServices.deleteUserById(req.params.id);
    if (!deletedUser) 
       return res.status(404).json({ message: "User not found" })
    
    res.status(200).json({ message: "User deleted successfully" });
}


module.exports = { createUser , getAllUsers , getUserById , updateUserById , deleteUserById }   