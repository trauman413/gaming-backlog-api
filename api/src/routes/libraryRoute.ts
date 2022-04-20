import express, { Router } from "express";
import { constants } from '../defs/constants'
import { getSingleLibrary, getLibraries, createLibrary, addToLibrary } from '../controllers/libraryController'

const libraryRouter = express.Router();

libraryRouter.use(express.json());
libraryRouter.use(express.urlencoded({ extended: false }));


const LIBRARY_ROUTE = `/${constants.Routes.LIBRARIES}`

// Get libraries
libraryRouter.get(LIBRARY_ROUTE, getLibraries)

// Get single library
libraryRouter.get(`${LIBRARY_ROUTE}/:libraryId`, getSingleLibrary)

// Create Library
libraryRouter.post(LIBRARY_ROUTE, createLibrary)

// Add game to library
libraryRouter.patch(`${LIBRARY_ROUTE}/:libraryId`, addToLibrary)


module.exports = libraryRouter;