import { Team } from './Team';
import { Trophy } from './Trophy';

export interface Player {
    id: string;
    nickname: string;
    name: string;
    age: number;
    nationality: string;
    isActive: boolean;
    teamId?: string;
    team: Team | null;
    trophyIds: string[];
    trophies?: Trophy[];
}
