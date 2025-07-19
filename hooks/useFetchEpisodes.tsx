import { Episode } from "@/types/Episode"
import { useState } from "react"

export function useFetchEpisodes() {
    const API_URL = process.env.NEXT_PUBLIC_RICK_AND_MORTY_API
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const [episodes, setEpisodes] = useState<Array<Episode>>([])

    const getEpisodes = async (episodesNumbers: Array<number>) => {
        try {
            setLoading(true)
            const response = await fetch(`${API_URL}/episode/${episodesNumbers}`, {
                method: 'GET',
            })

            if (!response.ok) return false

            const result = await response.json()

            setEpisodes(result)
        } catch (err: any) {
            setError(err)
        } finally {
            setLoading(false)
        }
        
        return episodes
    }

    return {
        loading,
        error,
        getEpisodes,
    }
}