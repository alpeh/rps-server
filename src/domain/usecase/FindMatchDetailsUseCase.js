const GameGateway = require("../Gateway/GameGateway");

class FindMatchDetailsUseCase
{
    findMatchDetails(matchId, userId)
    {
        var response = {
            matchId: "",
            winnerId: "",
            isGameOver: true,
            isDraw: false,
            handPlayed: "",
        };

        let game = this.gameGateway.getGame();
        let isMatch = game.isMatch(matchId);
        if(!isMatch) {
            return response;
        }
        
        game.determineWinner(matchId);
        let winner = game.getWinnerId(matchId);
        let isGameOver = game.isMatchOver(matchId);
        let isDraw = game.isDraw(matchId);
        let handPlayed = game.getHandPlayed(matchId, userId);

        response.matchId = matchId;
        response.winnerId = winner || "";
        response.isGameOver = isGameOver || false;
        response.handPlayed = handPlayed || "";
        response.isDraw = isDraw || false;
        return response;
    }

    constructor()
    {
        this.gameGateway = new GameGateway();
    }
}

module.exports = FindMatchDetailsUseCase;