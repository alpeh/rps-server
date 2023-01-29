let Game = require('./../BussinessObject/Game');

class GameGateway
{
    getGame()
    {
        return GameGateway.game;
    }

    saveGame(game)
    {
        GameGateway.game = game;
    }

    constructor()
    {

    }

    static game = new Game();
}

module.exports = GameGateway;