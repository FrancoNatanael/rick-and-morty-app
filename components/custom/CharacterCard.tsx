import { Character } from "@/types/Character";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface CharacterCardProps {
    character: Character
}

export default function CharacterCard ({character} : CharacterCardProps) {
    return <div>
        <Card>
            <CardContent className="flex gap-5 items-center">
                <Avatar className="w-22 h-22 rounded-sm">
                    <AvatarImage src={character.image} />
                    <AvatarFallback>{character.name}</AvatarFallback>
                </Avatar>

                <div>
                    <p className='font-semibold'>{character.name}</p>

                    <div className="flex gap-2">
                        <p>{character.status}</p>
                        <p>{character.species}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>
}