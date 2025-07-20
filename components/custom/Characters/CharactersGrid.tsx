'use client'
import { Character } from "@/types/Character";
import CharacterCard from "./CharacterCard";
import { Button } from "../../ui/button";
import { useState } from "react";

interface CharactersGridProps {
    characters: Character[]
    setSelectedCharacters: (characters: Array<Character>) => void
    selectedCharacters: Character[]
}

export default function CharactersGrid({characters, setSelectedCharacters, selectedCharacters}: CharactersGridProps) {
    const [itemsToShow, setItemsToShow] = useState(4)

    const handleClickShowItems = () => {
        const amount = itemsToShow < characters.length ?  characters.length : 4
        setItemsToShow(amount)
    }

    const handleClickSelectCharacter = (character: Character) => {
        const exists = selectedCharacters.some(c => c.id === character.id)

        if (exists) {
          setSelectedCharacters(selectedCharacters.filter(c => c.id !== character.id))
        } else {
          setSelectedCharacters([...selectedCharacters, character])
        }
    }

    return <div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-3 justify-between'>
                {
                    characters.slice(0, itemsToShow).map((character, i) => (
                        <div key={i} onClick={() => handleClickSelectCharacter(character)} className="cursor-pointer">
                            <CharacterCard 
                            character={character} 
                            key={character.id} 
                            selected={selectedCharacters.find(x => x.id === character.id)}/>
                        </div>
                    ))
                }
        </div>
    </div>
}