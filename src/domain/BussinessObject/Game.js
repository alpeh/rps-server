class Game
{
    createMatch(userId)
    {
        var oponentId = this.usersSearching.find(oponentId => oponentId != userId);
        var foundOponent = oponentId !== undefined;
        if(foundOponent) {
            var match = {
                userA: userId,
                userB: oponentId,
                matchId: this.matchIdCounter++,
            };
            this.matches.push(match);
            this.usersSearching = this.usersSearching.filter(id => id != userId && id != oponentId);
            return match.matchId;
        }

        var newSearch = this.usersSearching.find(id => id == userId);
        if(newSearch === undefined) {
            this.usersSearching.push(userId);
        }
        
        return "";
    }

    findMatchByUser(userId)
    {
        var userMatch = this.matches.find(e => e.userA == userId || e.userB == userId);
        var userMatchFound = userMatch !== undefined;
        return userMatchFound
            ? userMatch
            : undefined;
    }

    setHand(matchId, userId, hand)
    {
        let match = this.matches.find(e => e.matchId == matchId && (userId == e.userA || userId == e.userB));
        let isMatchValid = match !== undefined;
        let isHandValid = hand == "rock"
            || hand == "paper"
            || hand == "scissors";
        if(!isMatchValid || !isHandValid) {
            return;
        }

        if(match.userA == userId && match.handA == undefined) {
            match.handA = hand;
        }
        else if(match.userB == userId && match.handB == undefined) {
            match.handB = hand;
        }

        let latestMatches = this.matches.filter(e => e.matchId == matchId);
        this.matches = [...latestMatches, match];
    }

    isMatchCompleted(matchId)
    {
        let match = this.matches.find(e => e.matchId == matchId);
        return match !== undefined
            && match.handA !== undefined
            && match.handB !== undefined;
    }

    getWinnerId(matchId)
    {
        let match = this.matches.find(e => e.matchId == matchId);
        if(match == undefined || match.handA == undefined || match.handB == undefined) {
            return "";
        }

        var isDraw = match.handA == match.handB;
        if(isDraw) {
            return "";
        }

        var isFirstWinner = (match.handA == "rock" && match.handB == "scissors")
            || (match.handA == "paper" && match.handB == "rock")
            || (match.handA == "scissors" && match.handB == "paper");
        return isFirstWinner
            ? match.userA
            : match.userB;
    }

    getMatchState(matchId)
    {
        let match = this.matches.find(e => e.matchId == matchId);
        if(match == undefined || match.handA == undefined || match.handB == "undefined") {
            return "incomplete";
        }

        var isDraw = match.handA == match.handB;
        return isDraw
            ? "draw"
            : "complete";
    }

    constructor()
    {
        this.usersSearching = [];
        this.matches = [];
        this.matchIdCounter = 0;
    }
}

module.exports = Game;