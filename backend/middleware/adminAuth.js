import jwt from 'jsonwebtoken'

const adminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.json({ success: false, message: "Unauthorized Access" });
    }

    const token = authHeader.split(' ')[1]; // Remove 'Bearer ' from the token
    
    try {
      const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
      if (tokenDecode === process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
        next();
      } else {
        return res.json({ success: false, message: "Unauthorized Access" });
      }
    } catch (err) {
      return res.json({ success: false, message: "Invalid Token" });
    }
    
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default adminAuth;