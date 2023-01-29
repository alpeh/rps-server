# RPS Server
A game server for rock, paper, scissors

# APIs

## Find New Match
Handles finding new matches or current incomplete match. Response is empty when no match is found.

### Request
`GET /game/match/find/?userId`
### Response
    Content-Type: application/json
    {"matchId":1}

## Find Match Details
Provides state of a given match
### Request
`Get /game/match/details/?matchId&userId=`
### Response
	Content-Type: application/json
	{
	"matchId": 1, 
	"winnerId": "zach", 
	"isDraw": false, 
	"isGameOver": false, 
	"handPlayed": ""
	}

## Play Hand
Allows given user to enter hand for match
###Request
`Get /game/match/play/?matchId=&userId=&hand=`
###Response
	Content-Type: application/json
	{"matchId":1, "success": false, "errorMessage": ""}


