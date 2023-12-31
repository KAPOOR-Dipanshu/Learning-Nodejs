const express = require("express");
const fs = require("fs");
require('dotenv').config();
const { MongoClient } = require("mongodb");
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

const app = express();
const client = new MongoClient(MONGO_URL, {
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

/**
 * Here we are writing middleware to describe the usage of them
 * 1. we can execute any code .
 * 2. Access to request and response in every middleware
 * 3. End the request-response cycle.
 * 4. Call the next middleware in the stack.
 */
app.use(express.urlencoded({extended:false})) // here the middle ware is encoding the form data for a post route to req.body

app.use((req, res, next) => {
  console.log('Hello for middleware 1');
  next();
})

app.use((req,res,next) => {
  fs.appendFile('log.txt',`\n ${Date.now()} : ${req.method} : ${req.path}`, (err,data) => {
    next(); //this pass the control flow to next middleware or routes
  });
});

/* 
  here we have created a route for the /users that will render 
  the html to the cliend also known as server side rendering
*/

app.get("/users", async (req, res) => {
  res.setHeader("X-fame" , "Dipanshu"); // for better understanding we use X- as to differentiate between custom and default headers
  res.setHeader("X-stack" , "Fullstack");
  res.setHeader("X-age" , "69");
  /**
   * Headers are a important part of request and
   * response as they contain the metadata for the api call
   * Headers carry information for the request and response body
   */
  const queryFilters = {};
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
    return res.status(200).send(html);
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

    return res.status(200).json(users);
});

/**
 * this route for post method is created to create a new entry to the database
 * with the required data in the request body
 */

app.post("/api/users", async (req, res) => {
  try {
    if (!req.body.first_name || !req.body.last_name || !req.body.email || !req.body.job_title || !req.body.gender){
      return res.status(400).json({ message: "Missing required field"});
    }
    const userData = req.body; // Assuming the user data is sent in the request body
    // getting total users in the database.
    const users = await client
    .db("MyAssignment")
    .collection("learningNode")
    .find()
    .toArray();

    // setting id of our database row
    userData.id = users.length + 1;

    // Insert the new user data into the database
    const result = await client
      .db("MyAssignment")
      .collection("learningNode")
      .insertOne(userData);

    // If insertion is successful, send a success response
    return res.status(201).json({ message: "User created successfully", userId: result.insertedId });
  } catch (err) {
    // If an error occurs during insertion, send an error response
    return res.status(500).json({ message: "Failed to create user", error: err.message });
  }
});

/**
 * this route is created to get the detail of a
 * perticular id
 */

app.get("/api/users/:id", async (req, res) => {
  const queryFilters = {};
  queryFilters.id = Number(req.params.id);
  console.log(queryFilters);
  const user = await client
    .db("MyAssignment")
    .collection("learningNode")
    .find(queryFilters)
    .toArray();
    return res.status(200).json(user);
});

/**
 * this route is created for patch method to update a perticular
 * record with given id  
 */
app.patch("/api/users/:id", async (req, res) => {
  try {
    const updatedData = req.body;
    const id = Number(req.params.id);

    const result = await client
      .db("MyAssignment")
      .collection("learningNode")
      .updateOne({ id: id }, { $set: updatedData });

    if (result.matchedCount > 0) {
      return res.status(200).json({ message: "User updated successfully" });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Failed to update user", error: error.message });
  }
});

/**
 * this route is created to delete a perticular user 
 * with given id in the request params
 */

app.delete("/api/users/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const result = await client.db("MyAssignment").collection("learningNode").deleteOne({id:id});
    if (result.deletedCount > 0) {
      return res.status(200).json({ message: "User deleted successfully" });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete user", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/users`);
});
