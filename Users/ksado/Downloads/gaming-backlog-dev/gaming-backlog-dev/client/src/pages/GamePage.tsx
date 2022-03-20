import React from "react";
import { GameCard } from "../components/GameCard";
import logo from "../logo.svg"

export function GamePage() {

    const getTitle = () => {
        //TODO: fetch title from API
        return "Knights of the Old Republic";
    }

    const getImage = () => {
        //TODO: fetch image from API 
        return logo;
    }

    const getDescription = () => {
        //TODO: fetch description from API
        return "The best Star Wars Game";
    }

    return (
    // We'll want a page header at some point
    <GameCard gameTitle={getTitle()} gameImage={getImage()} gameDescription={getDescription()}/>
    )
}
