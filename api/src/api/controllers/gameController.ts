import { NextFunction, Request, Response } from 'express';
import { Game } from "../models/Game"
import { authenticate, extractGameInfo, gamesRequest, GameInfo } from "../services/services"
import axios from "axios"
// import async from "async"

let submittedStuff: any[] = []


// let getGameInformation = (req: Request, res: Response)  => {
//     authenticate()
//         .then(accessToken => gamesRequest(accessToken))
//         .then(gameInfo => {
//             let game: Game = extractGameInfo(gameInfo[0].data[0])
//             return res.json(game)
//         })
// }


let getGameInformation = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        let token: string = await authenticate()
        let gameInfo: GameInfo[] = await gamesRequest(token)
        // TODO: add error handling here rather than within services
        let game = extractGameInfo(gameInfo[0])
        return res.json(game)
    } 
    catch(ex) {
        return next(ex)
    }
}

let validateAdded = (req: Request, res: Response, next: NextFunction) => {
    //TODO: validation
    console.log(req.body)
    let friend = {
        gameID: req.body.gameID,
        userID: req.body.userID,
        library: req.body.library
    }
    submittedStuff.push(friend)
    res.send(200)
}

let getAdded = (req: Request, res: Response, next: NextFunction) => {
    console.log("hi??")
    console.log(submittedStuff)
    return res.json(submittedStuff[0])
}

// let getFromReactTest = (res: Response) => {
//     axios.get("http://localhost:3001/games/added")
//     .then(response => res.json(response.data))
//     .catch(err => console.log(err))
// }

export { getGameInformation, validateAdded, getAdded }