const http = require('http');
const urlHelper = require('url');
const FindMatchUseCase = require('./Domain/Usecase/FindMatchUseCase');
const PlayHandUseCase = require('./Domain/UseCase/PlayHandUseCase');
const FindMatchDetailsUseCase = require('./Domain/UseCase/FindMatchDetailsUseCase');
const hostname = '127.0.0.1';   
const port = 3000;

const server = http.createServer((req, res) => {
    let url = req.url;
    let content = "";
    let statusCode = 200;    

    res.setHeader('Content-Type', 'application/json');
    if(url.includes("/game/match/find")) {
        var urlData = urlHelper.parse(req.url, true);
        var userId = urlData.query.userId;
        var findMatchUseCase = new FindMatchUseCase();
        var matchId = findMatchUseCase.findMatch(userId);
        content = `{"matchId": "${matchId}"}`;
    }
    else if(url.includes("/game/match/details")) {
        let urlData = urlHelper.parse(req.url, true);
        let matchId = urlData.query.matchId;
        let userId = urlData.query.userId;
        let findMatchDetailsUseCase = new FindMatchDetailsUseCase();
        let matchResults = findMatchDetailsUseCase.findMatchDetails(matchId, userId);

        content = `{
            "matchId": "${matchResults.matchId}",
            "winnerId": "${matchResults.winnerId}",
            "isDraw": ${matchResults.isDraw},
            "isGameOver": ${matchResults.isGameOver},
            "handPlayed": "${matchResults.handPlayed}"
        }`;
    }
    else if(url.includes("/game/match/play")) {
        var urlData = urlHelper.parse(req.url, true);
        var matchId = urlData.query.matchId;
        var userId = urlData.query.userId;
        var hand = urlData.query.hand;
        var playHandUseCase = new PlayHandUseCase();
        var matchResponse = playHandUseCase.playHand(matchId, userId, hand);

        content = `{
            "matchId": "${matchResponse.matchId}",
            "success": "${matchResponse.success}",
            "errorMessage: "${matchResponse.errorMessage}"
        }`;
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

