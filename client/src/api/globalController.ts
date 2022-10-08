import PlayerController from './controllers/playersController';
import TeamController from './controllers/teamsController';
import TrophyController from './controllers/trophyController';

const globalController = {
    Player: PlayerController,
    Team: TeamController,
    Trophy: TrophyController,
};

export default globalController;
