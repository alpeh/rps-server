const http = require('http');
const urlHelper = require('url');
const FindMatchUseCase = require('./Domain/Usecase/FindMatchUseCase');
const PlayHandUseCase = require('./Domain/UseCase/PlayHandUseCase');
const hostname = '127.0.0.1';   
const port = 3000;




const server = http.createServer((req, res) => {
    let url = req.url;
    let content = "";
    let statusCode = 200;
    var userId = "";
    var urlData = urlHelper.parse(req.url, true);
    userId = urlData.query.userId;

    res.setHeader('Content-Type', 'application/json');
    if(url.includes("/game/find"))
    {
        var findMatchUseCase = new FindMatchUseCase();
        var matchId = findMatchUseCase.findMatch(userId);
        content = `{matchId: "${matchId}"}`;
    }
    else if(url.includes("/game/play-hand")) {
        var hand = urlData.query.hand;
        var playHandUseCase = new PlayHandUseCase();
        var matchResponse = playHandUseCase.playHand(userId, hand);
        content = `{matchId: "${matchResponse.matchId}", winnerId: "${matchResponse.winnerId}", state:"${matchResponse.state}"}`;
    }
    else {
        statusCode = 404;
    }

    res.statusCode = statusCode;
    res.end(content);
});


server.listen(port, hostname, () => {
    console.log(`server running at http://${hostname}:${port}/`);
});

