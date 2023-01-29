class Game
{
    findPending(userId)
    {
        let match = this
            .matches
            .find(m => !m.isGameOver 
                && m.users.find(u => u.id == userId) !== undefined
            );
        return match !== undefined
            ? match.id
            : undefined;
    }

    createNewMatch(userId)
    {
        let user = this.usersSearching.find(u => u.id != userId);
        if(user === undefined) {
            return undefined;
        }

        let newMatch = {
            id: this.matchIdCounter++,
            users: [user, {id: userId}],
            isGameOver: false,
        };
        this.matches.push(newMatch);
        this.usersSearching = this.usersSearching.filter(u => u.id != user.id && u.id != userId);
        return newMatch.id;
    }

    queUser(userId)
    {
        let user = this.usersSearching.find(u => u.id == userId);
        if(user == undefined) {
            this.usersSearching.push({id: userId});
        }
    }

    isUserMatch(matchId, userId)
    {
        let match = this
            .matches
            .find(m => m.id == matchId
                && m.users.find(u => u.id == userId) !== undefined);
        return match !== undefined;
    }

    isMatch(matchId) 
    {
        let match = this
        .matches
        .find(m => m.id == matchId);
        return match !== undefined;
    }

    isMatchOver(matchId)
    {
        let match = this
            .matches
            .find(m => m.id == matchId);
        return match !== undefined && match.isGameOver;
    }

    hasPlayedHand(matchId, userId)
    {
        let match = this
            .matches
            .find(m => m.id == matchId);
        if(match === undefined) {
            return true;
        }

        return match
            .users
            .find(u => u.id == userId && u.hand !== undefined)
            !== undefined;
    }

    isValidHand(hand)
    {
        return hand == "rock"
            || hand == "paper"
            || hand == "scissors";
    }

    setHand(matchId, userId, hand)
    {
        let match = this
            .matches
            .find(m => m.id == matchId);

        let user = match
            .users
            .find(u => u.id == userId);

        user.hand = hand;
        let users = match.users.filter(u => u.id !== userId);
        match.users = [...users, user];
        
        let matches = this.matches.filter(m => m.id != matchId);
        this.matches = [...matches, match];
    }

    determineWinner(matchId)
    {
        let match = this
        .matches
        .find(m => m.id == matchId);
        if(match.users.length < 2) {
            return;
        }

        let firstPlayer = match.users[0];
        let secondPlayer = match.users[1];
        if(firstPlayer.hand === undefined || secondPlayer.hand === undefined) {
            return;
        }

        let firstHand = firstPlayer.hand;
        let secondHand = secondPlayer.hand;
        let isDraw = firstHand == secondHand;
        let isFirstPlayerWinner = (firstHand == "rock" && secondHand == "scissors")
            || (firstHand == "scissors" && secondHand == "paper")
            || (firstHand == "paper" && secondHand == "rock");

        match.isGameOver = true;
        match.isDraw = isDraw;
        if(!match.isDraw) {
            match.winner = isFirstPlayerWinner
            ? firstPlayer
            : secondPlayer;
        }
        
        let matches = this.matches.filter(m => m.id != matchId);
        this.matches = [...matches, match];
    }

    getWinnerId(matchId)
    {
        let match = this.matches.find(m => m.id == matchId);
        return match.winner !== undefined
            ? match.winner.id
            : undefined;
    }

    getHandPlayed(matchId, userId)
    {
        let match = this.matches.find(m => m.id == matchId);
        let user = match.users.find(u => u.id == userId);
        return user !== undefined
            ? user.hand
            : undefined;
    }

    isDraw(matchId)
    {
        let match = this.matches.find(m => m.id == matchId);
        return match !== undefined
            ? match.isDraw
            : undefined;
    }

    constructor()
    {
        this.usersSearching = [];
        this.matches = [];
        this.matchIdCounter = 0;
    }
}

module.exports = Game;