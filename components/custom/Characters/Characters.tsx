import { Character } from "@/types/Character"
import CharactersGrid from "./CharactersGrid"

interface CharactersProps {
    charactersPage1: Character[]
    charactersPage2: Character[]
    setSelectedCharactersPage1: (characters: Array<Character>) => void
    setSelectedCharactersPage2: (characters: Array<Character>) => void
}

export default function Characters({charactersPage1, charactersPage2, setSelectedCharactersPage1, setSelectedCharactersPage2}: CharactersProps) {
    return <div className="grid grid-cols-2 gap-5 w-full">
        <div className="border border-black p-3 rounded-sm">
            <p className="text-xl font-semibold text-center mb-2">Character #1</p>
            <CharactersGrid characters={charactersPage1} setSelectedCharacters={setSelectedCharactersPage1}/>
        </div>

        <div className="border border-black p-3 rounded-sm">
            <p className="text-xl font-semibold text-center mb-2">Character #2</p>
            <CharactersGrid characters={charactersPage2} setSelectedCharacters={setSelectedCharactersPage2}/>
        </div>
    </div>
}