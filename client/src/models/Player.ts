import { TrophyObj } from './TrophyObj';
import { Team } from './Team';

export interface Player {
    id?: number;
    nickname: string;
    name: string;
    age: number;
    nationality: string;
    isActive: boolean;
    teamId: number;
    playerTrophies?: TrophyObj[];
    team?: Team;
}
