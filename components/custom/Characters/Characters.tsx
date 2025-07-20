import { Character } from "@/types/Character"
import CharactersGrid from "./CharactersGrid"

interface CharactersProps {
    charactersPage1: Character[]
    charactersPage2: Character[]
    setSelectedCharactersPage1: (characters: Array<Character>) => void
    setSelectedCharactersPage2: (characters: Array<Character>) => void
    selectedCharactersPage1: Character[]
    selectedCharactersPage2: Character[]
}

export default function Characters({
    charactersPage1,
    charactersPage2,
    setSelectedCharactersPage1,
    setSelectedCharactersPage2,
    selectedCharactersPage1,
    selectedCharactersPage2
}: CharactersProps) {
    return <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
        <div className="border-2 border-emerald-500 px-3 rounded-sm py-2">
            <p className="text-xl font-semibold text-center text-white mb-2">Character #1</p>
            <CharactersGrid 
            characters={charactersPage1} 
            setSelectedCharacters={setSelectedCharactersPage1}
            selectedCharacters={selectedCharactersPage1}/>
        </div>

        <div className="border-2 border-emerald-500 px-3 rounded-sm py-2">
            <p className="text-xl font-semibold text-center text-white mb-2">Character #2</p>
            <CharactersGrid 
            characters={charactersPage2} 
            setSelectedCharacters={setSelectedCharactersPage2}
            selectedCharacters={selectedCharactersPage2}/>
        </div>
    </div>
}