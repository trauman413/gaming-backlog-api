import { NextFunction, Request, Response } from 'express';
import { LibraryModel } from '../models/LibraryModel';
import { ObjectId } from "mongodb";
import { collections } from "../util/connection";
import { GameModel } from '../models/GameModel';

// GET sample
export let getGames = async (req: Request, res: Response) => {
    try {
        const games = (await collections.games!!.find({}).toArray()) as GameModel[];
 
         res.status(200).send(games);
     } catch (error: any) {
         res.status(500).send(error.message);
     }
}

// GET single game
export let getSingleGame = async (req: Request, res: Response) => {
    const gameId = req?.params?.gameId;
    try {
        const query = { _id: new ObjectId(gameId) };
        const game = (await collections.games!!.findOne(query)) as GameModel;

        if (game) {
            res.status(200).send(game);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
}

// POST game 
export let createGame = async (req: Request, res: Response) => {
    try {
        // TODO: validation
        const newGame = req.body as GameModel;
        const result = await collections.games!!.insertOne(newGame);

        result
            ? res.status(201).send(`Successfully created a new game with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new game.");
    } catch (error: any) {
        console.error(error);
        res.status(400).send(error.message);
    }
}

// Add to library 
// TODO: change all of below; make it a PUT request
export let addToLibrary = async (req: Request, res: Response) => {
    try {
        /**
         * Add game to library
         * 
         */
        const gameId = req?.params?.gameId;
        const libraryId = req.body.libraryId;
        const query = { _id: new ObjectId(libraryId) };
        const library = (await collections.libraries?.findOne(query)) as unknown as LibraryModel;
        library.games.push (gameId);
        const newValues = { $set : { games: library.games }}
        const result = await collections.libraries?.updateOne(query, newValues);
        result
            ? res.status(200).send(`Successfully added game to library`)
            : res.status(304).send(`Library with id: ${libraryId} not updated`);
    } catch (error: any) {
        console.error(error);
        res.status(400).send(error.message);
    }
}
