const GameGateway = require('./../Gateway/GameGateway');

class FindMatchUseCase
{
    findMatch(userId)
    {
        var game = this.gameGateway.getGame();
        var match = game.findMatchByUser(userId);
        var matchFound = match !== undefined;
        if(matchFound) {
            return match.matchId;
        }

        var matchId = game.createMatch(userId);
        this.gameGateway.saveGame(game);
        return matchId;
    }

    constructor()
    {
        this.gameGateway = new GameGateway();
    }

    static usersSearching = [];
    static matches = [];
    static matchIdCounter = 0;
}

module.exports = FindMatchUseCase;