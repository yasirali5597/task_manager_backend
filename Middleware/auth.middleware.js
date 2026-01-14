// // middleware/auth.middleware.js
// import jwt from "jsonwebtoken";

// export default (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) {
//     return res.sendStatus(401).json({
//       message: "token is not match",
//       success: true
//     });
//   }

//   const decoded = jwt.verify(token, process.env.JWT_SECRET);
//   req.userId = decoded.id;
//   next();
// };

import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Token missing or invalid",
      success: false,
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next(); // ✅ only called once
  } catch (error) {
    return res.status(401).json({
      message: "Token verification failed",
      success: false,
    });
  }
};

export default authMiddleware;
