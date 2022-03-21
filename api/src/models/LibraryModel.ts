import { ObjectId } from "mongodb"

class LibraryModel {
    games: any
    constructor(name: string, games?: Array<string>, id?: ObjectId) {}
}

export { LibraryModel }