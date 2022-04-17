import { Trophy } from '../Trophy';
import { TrophyId } from '../TrophyId';
import { TrophyObj } from '../TrophyObj';

export interface PlayerDTO {
    id?: number | string;
    nickname: string;
    name: string;
    age: number | string;
    nationality: string;
    isActive: boolean | string;
    teamId?: number | string;
    trophies?: Trophy[] | TrophyObj[] | TrophyId[];
}
