import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { LoaderFour } from "@/components/ui/loader";
import { useFetchEpisodes } from "@/hooks/useFetchEpisodes";
import { Character } from "@/types/Character";
import { Episode } from "@/types/Episode";
import { useEffect, useState } from "react";

interface EpisodesInfoCardProps {
    title: string
    selectedCharacters: Array<Character>
}

export default function EpisodesInfoCard({ title, selectedCharacters } : EpisodesInfoCardProps){
    const { getEpisodes, loading } = useFetchEpisodes()
    const [episodes, setEpisodes] = useState<Array<Episode>>([])

    const getEpisodeNumbers = () => {
        return selectedCharacters
        .map((character: Character) => character.episode)
        .flat()
        .map(episode => Number(episode.split('/').pop()))
    }

    const getEpisodesBySelectedCharacters = async () => {
        const episodes = await getEpisodes(getEpisodeNumbers())
        const newEpisodes = Array.isArray(episodes) ? episodes : [episodes as unknown as Episode]

        setEpisodes(newEpisodes!)
    }

    useEffect(() => {
        if(selectedCharacters.length > 0)
            getEpisodesBySelectedCharacters()
        else
            setEpisodes([])
    }, [selectedCharacters])
    
    return <Card className="rounded-sm h-[230px] overflow-y-scroll bg-sky-100">
        <CardTitle className="px-6 text-center">{title}</CardTitle>
        <CardContent>
            {   !loading &&
                episodes &&
                episodes.map((episode: Episode) => (
                    <p key={episode.id}><span className="font-semibold">Episode </span> {episode.name} - <span>{episode.air_date}</span></p>
                ))
            }
            {
                loading &&
                <div className="w-full h-[100px] flex items-center justify-center">
                    <LoaderFour/>
                </div>
            }
        </CardContent>
    </Card>
}