const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("jwtToken");

  if (!token) {
    return res.status(401).json({
      error: {
        status: 401,
        message: "Access denied. Log in first.",
      },
    });
  }

  try {
    const userData = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    req.userData = userData;
    next();
  } catch (error) {
    return res.status(401).json({
      error: {
        status: 401,
        message: "Access denied. Log in first.",
      },
    });
  }
};
