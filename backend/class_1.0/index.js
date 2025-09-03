const http = require('http');

const server = http.createServer((req, res) => {

    // res.end("hello0");

    if(req.url === '/contact'){
        res.end("hello from contact");
    } else if(req.url === '/home'){
        res.end("hello from home");
    }else{
        res.end('hi there')
    }
})

server.listen(3000, () => {
    console.log("listeining on port 3000")
})