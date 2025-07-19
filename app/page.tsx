'use client'

import { useFetchCharacters } from "@/hooks/useFetchCharacters";
import { useFetchEpisodes } from "@/hooks/useFetchEpisodes";
import { Character } from "@/types/Character";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const { loading, getCharacters } = useFetchCharacters()
  const { loading: loadingEposides, getEpisodes } = useFetchEpisodes()
  const [charactersPage1, setCharactersPage1] = useState<Array<Character>>([])
  const [charactersPage2, setCharactersPage2] = useState<Array<Character>>([])
  const [selectedCharacters, setSelectedCharacters] = useState<Array<Character>>([])

  const getEpisodesBySelectedCharacters = async () => {
    const epidosesToShow = selectedCharacters.map((character: Character) => character.episode).flat()
    const episodesResponse = await getEpisodes([1,2,3])
  }

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
      <p className='text-black text-center p-5'>Rick and Morty App</p>
    </div>
  );
}