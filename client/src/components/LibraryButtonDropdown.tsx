import React from "react"
import { useState, useEffect, useRef  } from "react";
import '../styles/game-display.css'
import AddToLibraryButton from "./AddToLibraryButton";
import LibraryDropDown from "./LibraryDropdown";
import useDetectOutsideClick from "./useDetectOutsideClick";

const libraryLabels = ["Backlog", "Wishlist", "Played"];

/**
 *  NOTE: not currently in use right now
 * @returns 
 */

const LibraryButtonDropdown= () => {
    const dropDownRef = useRef<HTMLLIElement>(null);
    const [isActive, setActive] = useDetectOutsideClick(dropDownRef, false)
    const onClick = () => setActive(!isActive);

    // return (
    // <div className="menu-container">
    //     <AddToLibraryButton text="Add to Library" onClick={onClick} />
    //     {isActive && <LibraryDropDown data={libraryLabels} />}
    // </div>
    // )}

    return (
        <div className="menu-container">
            {/* <button onClick={onClick} className="menu-trigger">
                <span>Add to Library</span>
            </button> */}
            <AddToLibraryButton text="Add to Library" onClick={onClick} />
            <nav ref={dropDownRef} className={`menu ${isActive ? 'active' : 'inactive'}`}>
                <ul>
                {
                    libraryLabels.map( (label: string, ind: number) => (
                        <li key={ind}>{label}</li>
                    ))
                }
                </ul>
            </nav>
        </div>
    )
}

export default LibraryButtonDropdown;