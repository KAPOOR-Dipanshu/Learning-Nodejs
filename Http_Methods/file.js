const express = require("express");
// const http = require("http");
// usage of express framework to write code clearly and beautifully

const app = express();

app.get("/", (request, response) => {
    response.send(`Your are at Home 🏚`)
    console.log(request.query);
});

app.get("/about", (request, response) => {
    response.send(`Your are at About 🥹`)
    console.log(request.query);
});

app.get("/search", (request, response) => {
    response.send(`Your are at Search 👀`)
    console.log(request.query);
});

app.get("/contact", (request, response) => {
    response.send(`Your are at Contact 📇`)
    console.log(request.query);
});

// const myServer = http.createServer(app);
// no need to use this now 
// myServer.listen(8000,() => console.log('Server Started'))

app.listen(8000,() => console.log('Server Started'))