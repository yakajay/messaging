const controller = require("../Controllers/UserControllers")
const express = require("express")
const router = express.Router()

router.post("/adduser", controller.addUser)
router.get("/allusers", controller.allUsers)

module.exports = router