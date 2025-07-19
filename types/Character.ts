export enum Status {
    ALIVE = 'Alive',
    DEAD = 'Dead',
    UNKNOWN = 'unknown'
}

export interface Character {
    id: number;
    name: string;
    status: Status;
    species: string;
    type: string;
    gender: "Female" | "Male" | "Genderless" | "unknown";
    origin: {
        name: string;
        url: string;
    };
    location: {
        name: string;
        url: string;
    };
    image: string;
    episode: string[];
    url: string;
    created: string;
}