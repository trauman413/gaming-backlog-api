import axios, { AxiosResponse } from 'axios'

/**
 * Information about a specific field
 */
 type FieldInfo = {
    id: number,
    name: string
}

/**
 * Information about the involved companies of a game
 */
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

/**
 * Information about a game from IGDB.
 *
 * TODO: might need more information
 */
type IGDBGame = {
    franchises: FieldInfo[],
    genres: FieldInfo[],
    involved_companies: InvolvedCompanies[]
    name: string,
    platforms: FieldInfo[],
    release_dates: { id: number; human: string }[],
    summary: string,
    artworks: {url: string }[]
}

/**
 * Generate an authentication token for calling IGDB endpoints.
 */
export const authenticate = async (): Promise<string> => {
  const url = 'https://id.twitch.tv/oauth2/token'
  const res: any = await axios.post(url, null, {
    params: {
      client_id: 'gcicsxic8po9xjyr4x2105gxm0861s',
      client_secret: 'bnsej7verrbr55dgkdxqk8aocxl2o4',
      grant_type: 'client_credentials'
    }
  })
  console.log(res.data.access_token)
  return res.data.access_token
}

/** Retrieves information about a given game and creates an associated Game
 *
 * @param accessToken   The authentication token
 * @param gameID        The associated gameID
 *
 * TODO: might need to change request data depending on what we want
 */
export const gamesRequest = async (accessToken: string, gameID: string): Promise<IGDBGame[]> => {
  const url = 'https://api.igdb.com/v4/games/'
  // let gameID = 26758
  const data = 'fields name, platforms.name, genres.name, release_dates.human, summary, franchises.name, involved_companies.company.name, artworks.url; where id =' + gameID + ';'
  const options = {
    headers: {
      'Client-ID': 'gcicsxic8po9xjyr4x2105gxm0861s',
      Authorization: 'Bearer ' + accessToken
    }
  }
  try {
    const res: AxiosResponse<IGDBGame[]> = await axios.post(
      url,
      data,
      options
    )
    return res.data
  } catch (err) {
    console.error(err)
    return []
  }
}
