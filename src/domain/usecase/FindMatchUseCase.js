class FindMatchUseCase
{
    findMatch(userId)
    {
        var userMatch = FindMatchUseCase.matches.find(e => e.userA == userId || e.userB == userId);
        var userMatchFound = userMatch !== undefined;
        if(userMatchFound) {
            return userMatch.matchId;
        }

        var oponentId = FindMatchUseCase.usersSearching.find(oponentId => oponentId != userId);
        var foundOponent = oponentId !== undefined;
        if(foundOponent) {
            var match = {
                userA: userId,
                userB: oponentId,
                matchId: FindMatchUseCase.matchIdCounter++,
            };
            FindMatchUseCase.matches.push(match);
            FindMatchUseCase.usersSearching = FindMatchUseCase.usersSearching.filter(id => id != userId && id != oponentId);
            return match.matchId;
        }
        else if(userId === "" || userId === undefined) {
            return "";
        }

        FindMatchUseCase.usersSearching.push(userId);
        return "";
    }

    constructor()
    {

    }

    static usersSearching = [];
    static matches = [];
    static matchIdCounter = 0;
}

module.exports = FindMatchUseCase;