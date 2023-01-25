const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    let url = req.url;
    let content = "";
    let statusCode = 200;

    res.setHeader('Content-Type', 'application/json');

    if(url == "/game/find") {
        content = '{matchId: ""}';
    }
    else if(url == "/game/play-hand") {
        content = '{matchId: "", userId: "", hand: ""}';
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

