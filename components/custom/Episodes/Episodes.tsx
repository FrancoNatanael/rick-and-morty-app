'use client'

import { Character } from "@/types/Character";
import EpisodesInfoCard from "./EpisodesInfoCard";
import { useState } from "react";

interface EpisodesProps {
    selectedCharactersPage1: Array<Character>
    selectedCharactersPage2: Array<Character>
}

export default function Episodes({ selectedCharactersPage1, selectedCharactersPage2 } : EpisodesProps){
    const [sharedCharacters, setSharedCharacters] = useState<Array<Character>>([])

    return <div className="grid grid-cols-3 gap-2">
        <EpisodesInfoCard 
        title="Character #1 - Only Episodes"
        selectedCharacters={selectedCharactersPage1}/>

        <EpisodesInfoCard 
        title="Characters #1 & #2 - Shred Episodes"
        selectedCharacters={sharedCharacters}/>

        <EpisodesInfoCard 
        title="Character #2 - Only Episodes"
        selectedCharacters={selectedCharactersPage2}/>
    </div>
}