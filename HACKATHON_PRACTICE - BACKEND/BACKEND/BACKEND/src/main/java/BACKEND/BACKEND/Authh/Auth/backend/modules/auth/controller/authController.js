const authService = require('../service/authService');

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await authService.registerUser({ name, email, password });

        res.status(201).json({
            success: true,
            data: user,
            message: 'User registered successfully'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            data: null,
            message: error.message
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { token, userId } = await authService.loginUser(email, password);

        res.status(200).json({
            success: true,
            data: {
                token,
                userId
            },
            message: 'Login successful'
        });
    } catch (error) {
        res.status(401).json({
            success: false,
            data: null,
            message: error.message
        });
    }
};

module.exports = {
    registerUser,
    loginUser
};
