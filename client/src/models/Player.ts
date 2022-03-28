import { Trophy } from './Trophy';

export interface Player {
    id: number;
    nickname: string;
    name: string;
    age: number;
    nationality: string;
    isActive: boolean;
    teamId: number;
    trophies?: Trophy[];
}
