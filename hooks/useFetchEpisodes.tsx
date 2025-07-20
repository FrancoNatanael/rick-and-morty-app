import { Episode } from "@/types/Episode"
import { useState } from "react"

export function useFetchEpisodes() {
    const API_URL = process.env.NEXT_PUBLIC_RICK_AND_MORTY_API
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()

    const getEpisodes = async (episodesNumbers: Array<number>) : Promise<Array<Episode> | undefined> => {
        try {
            setLoading(true)
            const response = await fetch(`${API_URL}/episode/${episodesNumbers}`, {
                method: 'GET',
            })

            if (!response.ok) throw new Error()

            const results = await response.json()

            return results
        } catch (err: any) {
            setError(err)
        } finally {
            setLoading(false)
        }
    }

    return {
        loading,
        error,
        getEpisodes,
    }
}