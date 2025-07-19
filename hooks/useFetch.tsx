import { Character } from "@/types/Character"
import { useState } from "react"

export function useFetch () {
    const API_URL = process.env.RICK_AND_MORTY_API
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const [characters, setCharacters] = useState<Array<Character>>([])

    const fetchCharacters = async () => {
        try {
            setLoading(true)
            const response = await fetch(`${API_URL}/character`, {
                method: 'GET',
            })

            if (!response.ok) return false

            const result = await response.json()
            setCharacters(result)
        } catch (err: any) {
            setError(err)
        } finally {
            setLoading(false)
        }
        
        return characters
    }
}