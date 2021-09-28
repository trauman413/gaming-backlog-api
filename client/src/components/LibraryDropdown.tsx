import React from "react"
import '../styles/game-display.css'

const LibraryDropDown = (props: {data: Array<string>}) => {
    return (
        <ul className="dropdown">
           {
               props.data.map( (label: string, ind: number) => (
                   <li key={ind}>{label}</li>
               ))
           }
        </ul>
    );
}

// return (
//     props.data.map( (label: string, num: number) => (
//         <div>
//         <ul>
//         <li key={num}>
//             {label}
//         </li>
//         </ul>
//         </div>
//     ))
// )



export default LibraryDropDown;