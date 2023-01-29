const GameGateway = require('./../Gateway/GameGateway');

class FindMatchUseCase
{
    findMatch(userId)
    {
        var game = this.gameGateway.getGame();
        var matchId = game.findPending(userId);
        var matchFound = matchId !== undefined;
        if(matchFound) {
            return matchId;
        }

        matchId = game.createNewMatch(userId);
        matchFound = matchId !== undefined;
        if(matchFound) {
            return matchId;
        }

        game.queUser(userId);
        this.gameGateway.saveGame(game);
        return "";
    }

    constructor()
    {
        this.gameGateway = new GameGateway();
    }
}

module.exports = FindMatchUseCase;