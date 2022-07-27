import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { collections } from '../util/connection';
import { LibraryModel } from '../models/LibraryModel';

/**
 * Returns all of the libraries
 */
export const getLibraries = async (req: Request, res: Response) => {
  try {
    const libraries = (await collections.libraries!!.find({}).toArray()) as unknown as LibraryModel[];

    res.status(200).send(libraries);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

/**
 * Returns a single library specified from a given libraryID
 */
export const getSingleLibrary = async (req: Request, res: Response) => {
  const libId = req?.params?.libraryId;
  try {
    const query = { _id: new ObjectId(libId) };
    const library = (await collections.libraries!!.findOne(query)) as unknown as LibraryModel;

    if (library) {
      res.status(200).send(library);
    }
  } catch (error) {
    res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
  }
};

/**
 * Creates a new library with a provided library. If no games are provided, it creates an empty games array.
 */
export const createLibrary = async (req: Request, res: Response) => {
  try {
    if (!req.body.games) {
      req.body.games = [];
    }
    const newLibrary: LibraryModel = req.body;
    const result = await collections.libraries!!.insertOne(newLibrary);
    result
      ? res.status(201).send(`Successfully created a new library with id ${result.insertedId}`)
      : res.status(500).send('Failed to create a new library.');
  } catch (error: any) {
    console.error(error);
    res.status(400).send(error.message);
  }
};

/**
 * Adds a game to a specified library
 *
 */
export const addToLibrary = async (req: Request, res: Response) => {
  try {
    const libraryId = req?.params?.libraryId;
    const gameId = req.body.gameId;
    const query = { _id: new ObjectId(libraryId) };
    const library = (await collections.libraries?.findOne(query)) as unknown as LibraryModel;
    library.games.push(gameId);
    const newValues = { $set: { games: library.games } };
    const result = await collections.libraries?.updateOne(query, newValues);
    result
      ? res.status(200).send('Successfully added game to library')
      : res.status(304).send(`Library with id: ${libraryId} not updated`);
  } catch (error: any) {
    console.error(error);
    res.status(400).send(error.message);
  }
};
