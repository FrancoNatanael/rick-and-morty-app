import { Character } from "@/types/Character"
import { useState } from "react"

export function useFetchCharacters() {
    const API_URL = process.env.NEXT_PUBLIC_RICK_AND_MORTY_API
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const [character, setCharacter] = useState<Character>()

    const getCharacters = async (page: number) : Promise<Character[] | undefined> => {
        try {
            setLoading(true)
            const response = await fetch(`${API_URL}/character?page=${page}`, {
                method: 'GET',
            })

            if (!response.ok) throw new Error()

            const {results} = await response.json()

            return results
        } catch (err: any) {
            setError(err)
        } finally {
            setLoading(false)
        }
    }

    const getCharacterById = async (id: number) => {
        try {
            setLoading(true)
            const response = await fetch(`${API_URL}/character/${id}`, {
                method: 'GET',
            })

            if (!response.ok) return false

            const result = await response.json()

            setCharacter(result)
        } catch (err: any) {
            setError(err)
        } finally {
            setLoading(false)
        }
        
        return character
    }

    return {
        loading,
        error,
        getCharacters,
        getCharacterById
    }
}