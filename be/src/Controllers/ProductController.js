const Product = require("../Models/Products")


exports.createProduct = async (req, res) => {
    try {
        const prodData = await Product.create(req.body)
        return res.status(200).json({MSG: "Products Data", prodData})
    } catch (error) {
        console.log(error);
    }
} 