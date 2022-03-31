import { Trophy } from '../Trophy';

export interface PlayerDTO {
    nickname: string;
    name: string;
    age: number;
    nationality: string;
    isActive: boolean;
    teamId?: number;
    trophies?: Trophy[];
}
