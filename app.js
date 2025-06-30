const http = require('http');
const server=http.createServer((req,res)=>{
    console.log('Server Created');

    res.setHeader('Content-Type','text/html');
    if(req.url==='/'){
        res.statusCode=200;
        res.end('<h1>Hello World</h1>');
    }
    else{
        if(req.url==='/pizza'){
            res.statusCode=200;
            res.end('<h1>This is your pizza</h1>');
        }
        else if(req.url==='/home'){
            res.statusCode=200;
            res.end('<h1>Welcome Home</h1>');
        }
        else if(req.url==='/about'){
            res.statusCode=200;
            res.end('<h1>Welcome to about us</h1>');
        }
        else if(req.url==='/node'){
            res.statusCode=200;
            res.end('<h1>Welcome to Node JS Project</h1>');
        }
        else{
            res.statusCode=400;
            res.end('<h1>Page not found</h1>');
        }
    }
})

let port=3000;
server.listen(port,()=>{
    console.log('Server Running');
});