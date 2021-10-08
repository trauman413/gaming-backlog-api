import express from "express"
import { authenticate, gamesRequest, extractGameInfo } from "./display-games"
import axios from 'axios'
import cors from "cors"
import { Game } from "./models/game"


/**
 * Sample promise code:
 * function that holds all of this with game ID as argument
 * authenticate().then(accessToken => {
 *  platformPromise = ...
 *  genrePromise = ...
 * [NOTE: summary and name are easy]
 * ...
 * Promise.all(do all of them) [[will need to break up the arrays]]
 * })
 * use all to create Game object
 * .then(create endpoint)
 */



const PORT = process.env.PORT || 3001

const app = express()

app.use(cors())
// const game = new Game()

// // TODO: add code to now extract each component of the game
// // Namely: Platform(s), genre(s), Universe, Companies, release year, image
authenticate()
.then(accessToken => gamesRequest(accessToken))
.then(gameInfo => {
    console.log(gameInfo)
    let game: Game = extractGameInfo(gameInfo.data[0])
    app.get("/supermarioodyssey", (req, res) => {
        console.log(game)
        res.json(game)
})

    const url = "http://localhost:3001/added"
    // app.get(url) 
    //     .then(res => console.log(res.data))
    //     .catch(err => console.log(err.data))   
    app.get("/added", (req, res) => {
        console.log(res)
        res.json()
    })


    app.listen(PORT, () => {
        console.log(`Server listening on ${PORT}`)
    }) 
})


let launchEndPoint = (gameInfo) => {
    app.get("/supermarioodyssey", (req, res) => {
        console.log(gameInfo.data.name)
        res.send(gameInfo.data.name)
    })

    app.listen(PORT, () => {
        console.log(`Server listening on ${PORT}`)
    })
}


