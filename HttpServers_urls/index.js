const http = require("http");
const fs = require('fs');
const url = require('url');

/* 
   createServer is used to declare a http server so than we can 
   listen the server on a perticular port we get both request and
   response in the call back under this function 
*/
const myServer = http.createServer((req, res) => {
  const myUrl = url.parse(req.url,true);
  console.log(myUrl)
  const log = `${Date.now()} : ${req.url} : New request recieved \n`
  fs.appendFile('Logs.txt',log,(err,data) => {
    switch (myUrl.pathname) {
        case '/':
            res.end("You Are At Home");
            break;
        case '/about':
          const user_name = myUrl.query.user_name
            res.end(`Here is everything about ${user_name}`);
            break;
        case '/hire':
            res.end("You Are At Hire");
            break;
        default:
            res.end("404 Not Found");
            break;
    }
  })
});
// listen function is used to run the server over a port and a call back to handle logs
myServer.listen(8000, () => {
  console.log("Server Started");
});
