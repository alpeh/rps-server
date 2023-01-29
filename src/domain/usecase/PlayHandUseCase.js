const GameGateway = require('./../Gateway/GameGateway');

class PlayHandUseCase
{
    playHand(matchId, userId, hand)
    {
        var response = { matchId: "", success: false, errorMessage: ""};
        var game = this.gameGateway.getGame();
        var matchExists = game.isUserMatch(matchId, userId);
        if(!matchExists) {
            response.errorMessage = "Match does not exist";
            return response;
        }

        var isMatchOver = game.isMatchOver(matchId);
        response.matchId = matchId;
        if(isMatchOver) {
            response.errorMessage = "Match is over";
            return response;
        }

        var handPreviouslyPlayed = game.hasPlayedHand(matchId, userId);
        if(handPreviouslyPlayed) {
            response.errorMessage = "Hand previously played";
            return response;
        }

        let handInvalid = !game.isValidHand(hand);
        if(handInvalid) {
            response.errorMessage = `${hand} is invalid hand`;
            return response;
        }

        game.setHand(matchId, userId, hand);
        this.gameGateway.saveGame(game);
        response.success = true;
        return response;
    }

    constructor()
    {
        this.gameGateway = new GameGateway();
    }
}

module.exports = PlayHandUseCase;