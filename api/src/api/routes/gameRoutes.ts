import express from "express";
import { Router } from "express";
import { getGameInformation, validateAdded, getAdded } from "../controllers/gameController";


const app = express()
const router = Router()

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.get("/supermarioodyssey", getGameInformation)
router.get("/added", getAdded)
router.post("/added", validateAdded)
// router.get("/added", function (req, res, next) {
//     res.json()
// })

module.exports = router;