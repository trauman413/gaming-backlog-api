import { useState, useEffect } from 'react';
import Game from './interfaces/Game'
import '../src/styles/game-display.css'

const App = () => {
  let emptyGame: Game = { name: "", platforms: [], genres: [], franchises: [], companies: [], releaseDate: [], summary: "", image: ""}
  const [data, setData] = useState(emptyGame);

    useEffect( () => {
        fetch("/games/supermarioodyssey")
        .then((res) => res.json())
        .then((data) => setData(data));
    }, []);

    const displayMultipleElements = (arr: Array<string>) : string => {
      if (arr.length <= 1) return arr[0]
      let vals = ""
      let count = 0
      while (count < arr.length) {
        vals += arr[count] 
        if (count !== arr.length - 1) {
          vals += ", "
        }
        count++
      }
      return vals
    }



    return (
      <div>
        {JSON.stringify(data) === JSON.stringify(emptyGame) ?
        <h1>"Loading..." </h1> :
        <div>
        <h1 className="game-title">{data.name}</h1>
        <img src={data.image} alt={data.name} width="150px" height="150px"/>
        <p><div className="game-field-header">Platforms: </div> {displayMultipleElements(data.platforms)}</p>
        <p><div className="game-field-header">Franchises: </div> {displayMultipleElements(data.franchises)}</p>
        <p><div className="game-field-header">Genres: </div> {displayMultipleElements(data.genres)}</p>
        <p><div className="game-field-header">Companies: </div>{displayMultipleElements(data.companies)}</p>
        <p><div className="game-field-header">Release: </div> {displayMultipleElements(data.releaseDate)}</p>
        <br></br>
        <p><div className="game-field-header">Summary: </div> {data.summary}</p>
        </div>
        }
      </div>
  )
}

export default App;
