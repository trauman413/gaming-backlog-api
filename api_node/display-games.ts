import { Game } from "./game"
import axios from 'axios'

type InvolvedCompanies = {
    id: number,
    company: FieldInfo,
    created_at: number,
    developer: boolean,
    game: number,
    porting: boolean,
    publisher: boolean,
    supporting: boolean,
    updated_at: number,
    checksum: string
}

type FieldInfo = {
    id: number,
    name: string
}


/** Generates an authentication token */
let authenticate = async () => {
    let url = "https://id.twitch.tv/oauth2/token"
    const res = await axios.post(url, null, { params: {
        client_id: "gcicsxic8po9xjyr4x2105gxm0861s",
        client_secret: "bnsej7verrbr55dgkdxqk8aocxl2o4",
        grant_type: "client_credentials"
    }})
    console.log(res.data.access_token)
    return res.data.access_token
}

/** Gets the game information */
let gamesRequest = async (accessToken) => {
    let url = "https://api.igdb.com/v4/games/"
    let gameID = 26758
    let data = 'fields name, platforms.name, genres.name, release_dates.human, summary, franchises.name, involved_companies.company.name, artworks.*; where id =' + gameID + ';'
    const options = {
        headers: {
            "Client-ID": "gcicsxic8po9xjyr4x2105gxm0861s",
            "Authorization": "Bearer " + accessToken,
        }
    }
    try {
        const res = await axios.post(
            url, 
            data, 
            options
            )
        return res
    } catch (err) {
        console.error(err)
        return err
    }
}

/** Takes each parsed component and returns a Game object ((TODO: maybe class?)) */
let extractGameInfo = (gameInfo) => {
    let franchises = extractFieldsFromList(gameInfo.franchises)
    let genres = extractFieldsFromList(gameInfo.genres)
    let involvedCompanies = extractCompanyNames(gameInfo.involved_companies)
    let name = gameInfo.name 
    let platforms = extractFieldsFromList(gameInfo.platforms)
    let releaseDates = extractReleaseDate(gameInfo.release_dates)
    let summary = gameInfo.summary === undefined ? "" : gameInfo.summary
    let image = (gameInfo.artworks === undefined || gameInfo.artworks.length === 0) ? "" : gameInfo.artworks[0].url 
    return new Game(name, platforms, genres, franchises, involvedCompanies, releaseDates, summary, image)
}

/** With a provided ID, gets the appropriate information. Used for items, franchises, and genres */
let extractFieldsFromList = (items: Array<FieldInfo>) : Array<string> => {
   if (items === undefined || items.length === 0 ) { return [] } 
   let lst: Array<string>  = [] 
   for (var item of items) {
        lst.push(item.name)
   }
   return lst
}

/** Gets the name of the companies */
let extractCompanyNames = (involvedCompanies: Array<InvolvedCompanies>) : Array<string> => {
    if (involvedCompanies === undefined || involvedCompanies.length === 0) { return [] }
    let lst: Array<string> = []
    for(var company of involvedCompanies) {
        lst.push(company.company.name)
    }
    return lst
}

/** Gets the human readable version of the release dates */
let extractReleaseDate = (releaseDates: Array<{id: number, human: string}>) : Array<string> => {
    if (releaseDates === undefined || releaseDates.length === 0) { return [] }
    let lst: Array<string> = []
    for(var date of releaseDates) {
        lst.push(date.human)
    }
    return lst
}

/** Extract image info */

export { authenticate, gamesRequest, extractGameInfo }

