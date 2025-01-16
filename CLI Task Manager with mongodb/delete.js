const http = require('http');
const server = http.createServer((req,res) =>{
    if(req.url === './'){
        res.setHeader('Content-Type','text/html');
        res.write("<H1>This is Heading</H1>");
        res.end();
    }else{
        console.log("Not a Home Page");
    }
   
});

server.listen(3000);