const express = require("express");
const { MongoClient } = require("mongodb");
const port = 3000;
const mongoUrl =
  "mongodb+srv://dipanshukapoor2002:Dipanshu4321@cluster0.ee31fyz.mongodb.net/";

const app = express();
const client = new MongoClient(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectToDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (e) {
    console.error("Error connecting to MongoDB", e);
  }
}

connectToDB();

/* 
  here we have created a route for the /users that will render 
  the html to the cliend also known as server side rendering
*/

app.get("/users", async (req, res) => {
  const queryFilters = {};
  console.log(queryFilters);
  const users = await client
    .db("MyAssignment")
    .collection("learningNode")
    .find(queryFilters)
    .toArray();

  const html = `
      <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
      </ul>
    `;
  res.status(200).send(html);
});

/**
 * here we have created the route /api/users which will give the json response and 
 * frontend will handle the json on client side rendering generally used for cross
 * platform support.
 */

app.get("/api/users", async (req, res) => {
  const queryFilters = {};
  console.log(queryFilters);
  const users = await client
    .db("MyAssignment")
    .collection("learningNode")
    .find(queryFilters)
    .toArray();

  res.status(200).json(users);
});

app.get("/api/users/:id", async (req, res) => {
  const queryFilters = {};
  queryFilters.id = Number(req.params.id);
  console.log(queryFilters);
  const user = await client
    .db("MyAssignment")
    .collection("learningNode")
    .find(queryFilters)
    .toArray();
  res.status(200).json(user);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/users`);
});
