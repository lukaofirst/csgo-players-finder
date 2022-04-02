import { Player } from './Player';

export interface Team {
    id: number;
    name: string;
    location: string;
    region: string;
    foundedYear: number;
    players?: Player[];
}
