import jwt from 'jsonwebtoken';

const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        // Direct redirect if token is missing
        return res.redirect(302, '/login');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next(); // Proceed to the route if valid
    } catch (err) {
        console.log('Invalid token:', err.message);
        return res.redirect(302, '/login'); // Redirect if token is invalid
    }
};

export default authenticateUser;
