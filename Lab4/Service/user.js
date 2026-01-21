const User = require("../Model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const APIError  = require("../helpers/APIError"); 



const signUp = async (data) => 
{
    const { email, password, ...rest } = data;

    const existingUser = await User.findOne({ email });
    if (existingUser) 
        throw new APIError("Email already exists", 409);
    

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({email, password: hashedPassword, ...rest });

    return user;
};

const signIn = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) 
        throw new APIError("Invalid email or password", 401);
    

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) 
        throw new APIError("Invalid email or password", 401);
    

    const payload = { userId: user._id,  role: user.role};

    const signAsync = require("util").promisify(jwt.sign);
    const token = await signAsync(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    return { token, user: userWithoutPassword };
};

const getAllUsers = async (query) => 
{
    let { page = 1, limit = 10 } = query;
    page = parseInt(page);
    limit = parseInt(limit);

    const userPromise = User.find({}, { password: 0 }).skip((page - 1) * limit).limit(limit);
    const totalPromise = User.countDocuments();

    const [users, total] = await Promise.all([userPromise, totalPromise]);

    const pagenation = 
    {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
    };

    return { users, pagenation };
};

const getUserById = async (id) => 
{
    const user = await User.findOne({ _id: id }, { password: 0 });
    if (!user)
        return null;

    return user;
};

const updateUserById = async (id, data) => 
{
    const updatedUser = await User.findOneAndUpdate({ _id: id }, data, { new: true });
    if (!updatedUser)
        return null;

    return updatedUser;
};

const deleteUserById = async (id) => 
{
    const deletedUser = await User.findOneAndDelete({ _id: id });
    if (!deletedUser)
        return null;

    return deletedUser;
};

module.exports = { signUp, signIn, getAllUsers, getUserById, updateUserById, deleteUserById};

