import { Character, Status } from "@/types/Character";
import { Card, CardContent } from "../../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

interface CharacterCardProps {
    character: Character
    selected?: Character
}

export default function CharacterCard ({character, selected} : CharacterCardProps) {
    return <div>
    <Card
      className={`relative transition-transform duration-300 ease-in-out hover:scale-[1.03]
        ${selected
          ? "border-4 border-yellow-400 shadow-[0_0_15px_#facc15]"
          : "border-2 border-green-400 shadow-md"}
        bg-gradient-to-br from-[#1affd5] to-[#5e17eb]`}
    >
        {selected && (
            <CheckCircle2
            className="absolute top-2 right-2 text-yellow-300 bg-black rounded-full"
            size={24}
            />
      )}
      <CardContent className="flex gap-5 items-center p-2 text-white">
        <Avatar className="w-20 h-20 shadow-lg border-2 border-white">
          <AvatarImage src={character.image} alt={character.name} />
          <AvatarFallback>{character.name[0]}</AvatarFallback>
        </Avatar>

        <div>
          <p className="text-xl font-bold">{character.name}</p>

          <div className="flex gap-2 text-sm opacity-90">
            <Badge
              className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                character.status === Status.ALIVE
                  ? "bg-green-500"
                  : character.status === Status.DEAD
                  ? "bg-red-500"
                  : "bg-gray-500"
              }`}
            >
              {character.status}
            </Badge>

            <span className="text-white/80">{character.species}</span>
          </div>
        </div>
      </CardContent>
    </Card>
    </div>
}