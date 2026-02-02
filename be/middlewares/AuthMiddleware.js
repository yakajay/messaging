const jwt = require("jsonwebtoken")
const env = require("dotenv")

env.config()

exports.authMiddleware = (req, res, next) => {
    try {
        const headersData = req.headers.authorization
        if (!headersData || !headersData.startsWith("Bearer ")) {
            return res.status(401).json({MSG: "Token required"})
        }
        const tokenData = headersData.split(" ")[1] 
        const decodedData = jwt.verify(tokenData, process.env.SECRET_JWT)
        console.log("key", process.env.SECRET_JWT);
        req.id = decodedData.id
        next()
    } catch (error) {
        console.log(error);
    }
}
