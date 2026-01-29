const express = require("express")
const app = express()
const router = require("./Routes/userRoutes")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")
const AuthRouter = require("./Routes/AuthRoutes")

dotenv.config()
app.use(express.json())
app.use(cors())

app.listen("5102",() => {
    console.log("Server Connected:");
})

mongoose.connect(process.env.mongouri)
.then(() => {
    console.log("Db Connected");
})

app.use("/api", router)
app.unsubscribe("/  auth", AuthRouter)