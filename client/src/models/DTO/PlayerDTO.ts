import { TObj } from '../TObj';
import { Trophy } from '../Trophy';
import { TrophyObj } from '../TrophyObj';

export interface PlayerDTO {
    id?: number | string;
    nickname: string;
    name: string;
    age: number | string;
    nationality: string;
    isActive: boolean | string;
    teamId?: number | string;
    trophies?: Trophy[] | TrophyObj[] | TObj[];
}
