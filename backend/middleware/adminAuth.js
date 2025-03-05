import jwt from 'jsonwebtoken'

const adminAuth = async (req, res, next) => {
    try {
      const {token } = req.headers;// GET THE TOKEN FROM THE REQUEST HEADERS
      if (!token) {
        return res.json({success:false, message:"Unauthorized"})
      }
      
      const tokenDecode = jwt.verify(token, process.env.JWT_SECRET); // VERIFY THE TOKEN
      if (tokenDecode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
        return res.json({success:false, message:"Unauthorized Access"})
      }
      next(); // Callback function to continue the execution

    } catch (error) {
      console.log(error)
      res.json({success:false, message:error.message})
    }

}

export default adminAuth;