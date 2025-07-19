import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useFetchEpisodes } from "@/hooks/useFetchEpisodes";
import { Character } from "@/types/Character";
import { Episode } from "@/types/Episode";
import { useEffect, useState } from "react";

interface EpisodesInfoCardProps {
    title: string
    selectedCharacters: Array<Character>
}

export default function EpisodesInfoCard({ title, selectedCharacters } : EpisodesInfoCardProps){
    const { getEpisodes } = useFetchEpisodes()
    const [episodes, setEpisodes] = useState<Array<Episode>>([])

    const getEpisodeNumbers = () => {
        return selectedCharacters
        .map((character: Character) => character.episode)
        .flat()
        .map(episode => Number(episode.split('/').pop()))
    }

    const getEpisodesBySelectedCharacters = async () => {
        const episodes = await getEpisodes(getEpisodeNumbers())

        setEpisodes(episodes!)
    }

    useEffect(() => {
        getEpisodesBySelectedCharacters()
    }, [selectedCharacters])
    
    return <Card className="rounded-sm">
        <CardTitle className="px-6">{title}</CardTitle>
        <CardContent>
            {
                episodes.map((episode: Episode) => (
                    <p key={episode.id}>Episode: {episode.name} - <span>{episode.air_date}</span></p>
                ))
            }
        </CardContent>
    </Card>
}