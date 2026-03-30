const authService = require('../service/authService');

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Call service layer
    const data = await authService.registerUser({ name, email, password });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Server Error'
    });
  }
};

/**
 * @desc    Authenticate user and log in
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Call service layer
    const data = await authService.loginUser(email, password);

    res.status(200).json({
      success: true,
      message: 'User logged in successfully',
      data
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Server Error'
    });
  }
};

module.exports = {
  register,
  login
};
