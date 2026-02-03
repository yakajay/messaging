const Auth = require("../Models/AuthModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.register = async (req, res) => {
    const { username, password, email } = req.body
    try {
     const user = await Auth.findOne({email})
     if (user) {
        return res.status(401).json({ MSG: "Email Already exists"})
     }
     const hashPassword = await bcrypt.hash(password, 10)
     const newUser = await Auth.create({
        username, email, password: hashPassword
     })
     res.json(newUser)
    } catch (error) {
        console.log(error);
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await Auth.findOne({email})
        if (!user) {
            return res.status(401).json({ MSG: "Email Not Found"})
        }
        const userMapping = await bcrypt.compare(password, user.password)
        if (!userMapping) {
            return res.status(401).json({MSG: "Invalid Credentials"})
        }
        const jwtToken = jwt.sign(
            {id: user._id}, "SECRET_JWT", {expiresIn: "1d"}
        )
        res.json(jwtToken)
    } catch (error) {
        console.log(Error);
    }
}