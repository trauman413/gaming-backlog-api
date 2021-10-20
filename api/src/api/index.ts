import express from "express";
import { Router } from "express";
import cors from "cors";

var gamesRouter = require("./routes/gameRoutes")


const PORT = process.env.PORT || 3001

const app = express()
const router = Router()
// TODO: might need CORS
app.use(cors())

const rt = router.get("/", function (req, res) {
    res.send("Hello!")
})

app.use("/", rt)
app.use("/games", gamesRouter)
// const testPost = router.post("/added", function(req, res) {
//     return res.json(req.body)
// })

//TODO: figure out how to display POST here

// app.use("/added", testPost)


app.listen(PORT, () => {
    console.log("Hello!")
})

