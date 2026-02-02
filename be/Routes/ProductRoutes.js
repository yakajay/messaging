const express = require("express")
const ProductController = require("../Controllers/ProductController")
const router = express.Router()
const banana = require("../middlewares/AuthMiddleware")

router.post("/newproduct", banana.authMiddleware, ProductController.createProduct)

module.exports = router