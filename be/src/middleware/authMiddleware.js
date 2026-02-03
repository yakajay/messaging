const jwt = require("jsonwebtoken")
const env = require("dotenv")

env.config()
const authMiddle = (req, res, next) => {
    try {
        const headersData = req.headers.authorization
        if (!headersData) {
            return res.statua(401).json({MSG: "Token Required"})
        }
        const tokenData = headersData.split(" ")
        const decodedData = jwt.verify(tokenData, process.env.SECRET_JWT)
        req.id = decodedData.id
        next()
    } catch (error) {
        console.log(error);
    }
}

module.exports = authMiddle