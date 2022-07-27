import * as mongoDB from 'mongodb';
import * as dotenv from 'dotenv';

export const collections: { games?: mongoDB.Collection, libraries?: mongoDB.Collection } = {};

export async function connectToDatabase () {
  dotenv.config();

  const client: mongoDB.MongoClient = new mongoDB.MongoClient('mongodb+srv://admin:admin64@gamingbacklog.ce5ec.mongodb.net/libraries?retryWrites=true&w=majority');

  await client.connect();

  const db: mongoDB.Db = client.db('gamesDB');

  const gamesCollection: mongoDB.Collection = db.collection('games');
  const libraryCollection: mongoDB.Collection = db.collection('libraries');

  collections.games = gamesCollection;
  collections.libraries = libraryCollection;
  console.log(`Successfully connected to database: ${db.databaseName}`);
}
