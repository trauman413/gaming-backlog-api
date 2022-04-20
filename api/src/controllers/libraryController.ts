import { NextFunction, Request, Response } from 'express';
import { ObjectId } from "mongodb";
import { collections } from "../util/connection";
import { LibraryModel } from '../models/LibraryModel';

export let getLibraries = async (req: Request, res: Response) => {
    try {
        const libraries = (await collections.libraries!!.find({}).toArray()) as unknown as LibraryModel[];
 
         res.status(200).send(libraries);
     } catch (error: any) {
         res.status(500).send(error.message);
     }
}

export let getSingleLibrary = async (req: Request, res: Response) => {
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
}


export let createLibrary = async (req: Request, res: Response) => {
    try {
        if (!req.body.games) {
            req.body.games = [];
        }
        const newLibrary: LibraryModel = req.body;
        const result = await collections.libraries!!.insertOne(newLibrary);
        result
            ? res.status(201).send(`Successfully created a new library with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new library.");
    } catch (error: any) {
        console.error(error);
        res.status(400).send(error.message);
    }
}
