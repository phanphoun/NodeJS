const validateRegister = (req, res, next) => {
    const { username, email, password, role } = req.body;

    // Check required fields
    if (!username || !email || !password) {
        return res.status(400).json({
            message: 'Username, email and password are required'
        });
    }

    // Validate username
    if (typeof username !== 'string' || username.trim().length < 3) {
        return res.status(400).json({
            message: 'Username must be at least 3 characters long'
        });
    }

    if (username.trim().length > 30) {
        return res.status(400).json({
            message: 'Username must be less than 30 characters'
        });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
        return res.status(400).json({
            message: 'Please provide a valid email address'
        });
    }

    // Validate password strength
    if (typeof password !== 'string' || password.length < 8) {
        return res.status(400).json({
            message: 'Password must be at least 8 characters long'
        });
    }

    if (!/(?=.*[a-z])/.test(password)) {
        return res.status(400).json({
            message: 'Password must contain at least one lowercase letter'
        });
    }

    if (!/(?=.*[A-Z])/.test(password)) {
        return res.status(400).json({
            message: 'Password must contain at least one uppercase letter'
        });
    }

    if (!/(?=.*\d)/.test(password)) {
        return res.status(400).json({
            message: 'Password must contain at least one number'
        });
    }

    // Validate role if provided
    if (role) {
        const validRoles = ['user', 'admin', 'moderator'];
        if (!validRoles.includes(role)) {
            return res.status(400).json({
                message: 'Invalid role. Must be user, admin or moderator'
            });
        }
    }

    // Sanitize inputs
    req.body.username = username.trim();
    req.body.email = email.trim().toLowerCase();
    
    next();
};

const validateLogin = (req, res, next) => {
    const { email, password } = req.body;

    // Check required fields
    if (!email || !password) {
        return res.status(400).json({
            message: 'Email and password are required'
        });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
        return res.status(400).json({
            message: 'Please provide a valid email address'
        });
    }

    // Sanitize inputs
    req.body.email = email.trim().toLowerCase();
    
    next();
};

export {
    validateRegister,
    validateLogin
};
