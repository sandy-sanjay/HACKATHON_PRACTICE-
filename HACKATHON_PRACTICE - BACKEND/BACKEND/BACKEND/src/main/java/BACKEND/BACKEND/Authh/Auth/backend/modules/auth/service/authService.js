const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/User');

const registerUser = async (userData) => {
    const { name, email, password } = userData;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new Error('User already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    return {
        _id: user._id,
        name: user.name,
        email: user.email
    };
};

const loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    // Generate token
    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET || 'your_jwt_secret_key',
        { expiresIn: '30d' }
    );

    return {
        token,
        userId: user._id
    };
};

module.exports = {
    registerUser,
    loginUser
};
