const User = require('../model/User');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'your_jwt_secret_key', {
    expiresIn: '30d'
  });
};

/**
 * Register a new user
 * @param {Object} userData - name, email, password
 */
const registerUser = async (userData) => {
  const { name, email, password } = userData;

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    const error = new Error('User already exists');
    error.statusCode = 400;
    throw error;
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password
  });

  if (user) {
    return {
      userId: user._id,
      token: generateToken(user._id)
    };
  } else {
    const error = new Error('Invalid user data');
    error.statusCode = 400;
    throw error;
  }
};

/**
 * Authenticate user and get token
 * @param {string} email
 * @param {string} password
 */
const loginUser = async (email, password) => {
  // Find user by email and include password field
  const user = await User.findOne({ email }).select('+password');

  if (user && (await user.matchPassword(password))) {
    return {
      userId: user._id,
      token: generateToken(user._id)
    };
  } else {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }
};

module.exports = {
  registerUser,
  loginUser
};
