import { ObjectId } from "mongodb"

// TODO: lots of this is temporary/may be shifted from IGDB ==> missing release year
class GameModel {
    constructor(name: string, platform: string, genre: string, universe: string, company: string, id?: ObjectId) {
    }
}

export { GameModel };
