const GameGateway = require('./../Gateway/GameGateway');

class PlayHandUseCase
{
    playHand(userId, hand)
    {
        var matchResults = { matchId: "", winnerId: "", state: ""};
        var game = this.gameGateway.getGame();
        var match = game.findMatchByUser(userId);
        if(match === undefined) {
            matchResults;
        }

        matchResults.matchId = match.matchId;
        game.setHand(match.matchId, userId, hand);
        this.gameGateway.saveGame(game);
        if(game.isMatchCompleted(match.matchId)) {
            matchResults.winnerId = game.getWinnerId(match.matchId);
            matchResults.state = game.getMatchState(match.matchId);
            return matchResults;
        }

        return matchResults;
    }

    constructor()
    {
        this.gameGateway = new GameGateway();
    }
}

module.exports = PlayHandUseCase;