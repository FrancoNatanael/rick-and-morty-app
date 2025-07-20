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
    <div className="h-full md:h-screen w-full bg-[url('/bg.jpg')] bg-contain bg-center">
      <Image 
        src="/rick-and-morty.png" 
        alt="Logo" 
        width={130} 
        height={130}
        className="mx-auto"
      />

      <div className="px-5 mb-2">
        {
          !loading &&
          <Characters 
          charactersPage1={charactersPage1} 
          charactersPage2={charactersPage2}
          setSelectedCharactersPage1={setSelectedCharactersPage1}
          setSelectedCharactersPage2={setSelectedCharactersPage2}
          selectedCharactersPage1={selectedCharactersPage1}
          selectedCharactersPage2={selectedCharactersPage2}
          />
        }
      </div>
      <div className="px-5">
        <Episodes 
        selectedCharactersPage1={selectedCharactersPage1} 
        selectedCharactersPage2={selectedCharactersPage2}/>
      </div>
    </div>
  );
}