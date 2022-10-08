import { Player } from './Player';

export interface Team {
    id: string | null;
    name: string;
    location: string;
    region: string;
    foundedYear: number;
    players?: Player[];
}
