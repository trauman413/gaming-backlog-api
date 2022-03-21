import express, { Router } from "express";
import { constants } from '../defs/constants'
// import { addToLibrary, getLibraryGames } from "../controllers/gameController";
 import { getGames, getSingleGame, createGame, addToLibrary } from "../controllers/gameController";

const gameRouter = express.Router();

gameRouter.use(express.json());
gameRouter.use(express.urlencoded({ extended: false }));

const GAME_ROUTE = `/${constants.Routes.GAMES}`

// GET all games --> TODO: this will need to be in library
gameRouter.get(GAME_ROUTE, getGames)

// GET one game by ID
gameRouter.get(`${GAME_ROUTE}/:gameId`, getSingleGame)

// POST game 
gameRouter.post(GAME_ROUTE, createGame)

// Add game to library
gameRouter.post(`${GAME_ROUTE}/:gameId/addToLibrary`, addToLibrary)


module.exports = gameRouter;