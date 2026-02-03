const User = require("../Models/User")

const addUser = async (req, res) => {
    try {
        const data = await User.create(req.body)
        return res.status(200).json(data)
    } catch (error) {
        console.log(error);
    }
}

const allUsers = async (req, res) => {
    try {
        const allData = User.find()
        return res.json(allData)
    } catch (error) {
        console.log(error);
    }
}

module.exports = {addUser, allUsers}