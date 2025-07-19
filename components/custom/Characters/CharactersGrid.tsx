'use client'
import { Character } from "@/types/Character";
import CharacterCard from "./CharacterCard";
import { Button } from "../../ui/button";
import { useState } from "react";

interface CharactersGridProps {
    characters: Character[]
    setSelectedCharacters: (characters: Array<Character>) => void
}

export default function CharactersGrid({characters, setSelectedCharacters}: CharactersGridProps) {
    const [itemsToShow, setItemsToShow] = useState(4)

    const handleClickShowItems = () => {
        const amount = itemsToShow < characters.length ?  characters.length : 4
        setItemsToShow(amount)
    }
    return <div>
        <div className='grid grid-cols-2 gap-3 justify-between'>
                {
                    characters.slice(0, itemsToShow).map((character, i) => (
                        <div key={i}>
                            <CharacterCard character={character} key={character.id}/>
                        </div>
                    ))
                }
        </div>

            <Button 
            variant={'link'} 
            className="self-rigth" 
            onClick={handleClickShowItems}>
                {itemsToShow < characters.length ? 'show more...' : 'show less...'}
            </Button>
    </div>
}