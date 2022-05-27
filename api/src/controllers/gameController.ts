import { NextFunction, Request, Response } from 'express';
import { ObjectId } from "mongodb";
import { collections } from "../util/connection";
import { GameInstanceModel } from '../models/GameInstanceModel';

/**
 * Returns all of the games currently stored in the database irregardless of library.
 * 
 * TODO: remove this once we have IGDB support
 */
export let getGames = async (req: Request, res: Response) => {
    try {
        const games = (await collections.games!!.find({}).toArray()) as GameInstanceModel[];
 
         res.status(200).send(games);
     } catch (error: any) {
         res.status(500).send(error.message);
     }
}

/**
 * Returns a single game stored in the games collection irregardless of library.
 * 
 * TODO: remove once we have IGDB support
 */
export let getSingleGame = async (req: Request, res: Response) => {
    const gameId = req?.params?.gameId;
    try {
        const query = { _id: new ObjectId(gameId) };
        const game = (await collections.games!!.findOne(query)) as GameInstanceModel;

        if (game) {
            res.status(200).send(game);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
}

/**
 * Creates a new game in the database, not necessarily within a library.
 * 
 * TODO: remove once we have IGDB support.
 */
export let createGame = async (req: Request, res: Response) => {
    try {
        const newGame = req.body as GameInstanceModel;
        const result = await collections.games!!.insertOne(newGame);

        result
            ? res.status(201).send(`Successfully created a new game with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new game.");
    } catch (error: any) {
        console.error(error);
        res.status(400).send(error.message);
    }
}
