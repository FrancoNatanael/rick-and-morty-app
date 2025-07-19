'use client'

import Characters from "@/components/custom/Characters/Characters";
import CharactersGrid from "@/components/custom/Characters/CharactersGrid";
import Episodes from "@/components/custom/Episodes/Episodes";
import { useFetchCharacters } from "@/hooks/useFetchCharacters";
import { useFetchEpisodes } from "@/hooks/useFetchEpisodes";
import { Character } from "@/types/Character";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const { loading, getCharacters } = useFetchCharacters()
  const [charactersPage1, setCharactersPage1] = useState<Array<Character>>([])
  const [charactersPage2, setCharactersPage2] = useState<Array<Character>>([])
  const [selectedCharactersPage1, setSelectedCharactersPage1] = useState<Array<Character>>([])
  const [selectedCharactersPage2, setSelectedCharactersPage2] = useState<Array<Character>>([])

  useEffect(() => {
    const fetchData = async () => {
      const promises = [getCharacters(1), getCharacters(2)]
      const [page1, page2] = await Promise.all(promises)

      setCharactersPage1(page1!)
      setCharactersPage2(page2!)
    }

    fetchData()
  }, [])

  return (
    <div>
      <p className='text-black text-center p-2'>Rick and Morty App</p>

      <div className="p-5">
        {
          !loading &&
          <Characters 
          charactersPage1={charactersPage1} 
          charactersPage2={charactersPage2}
          setSelectedCharactersPage1={setSelectedCharactersPage1}
          setSelectedCharactersPage2={setSelectedCharactersPage2} />
        }
      </div>
      <div className="px-5">
        <Episodes selectedCharactersPage1={selectedCharactersPage1} selectedCharactersPage2={selectedCharactersPage2}/>
      </div>
    </div>
  );
}