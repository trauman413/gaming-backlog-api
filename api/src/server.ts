import express from "express";
import cors from "cors";
import { connectToDatabase } from "./util/connection";
let gameRouter = require("./routes/gameRoute")
let libraryRouter = require ("./routes/libraryRoute")


const PORT = process.env.PORT || 3001

const app = express()
app.use(cors())

connectToDatabase()
    .then(() => {
        app.use(gameRouter);
        app.use(libraryRouter);

        app.listen(PORT, () => {
            console.log(`Server started at http://localhost:${PORT}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });

