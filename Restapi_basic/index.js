const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
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

app.use(express.urlencoded({extended:false}))

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

/**
 * this route for post method is created to create a new entry to the database
 * with the required data in the request body
 */

app.post("/api/users", async (req, res) => {
  try {
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
    res.status(201).json({ message: "User created successfully", userId: result.insertedId });
  } catch (err) {
    // If an error occurs during insertion, send an error response
    res.status(500).json({ message: "Failed to create user", error: err.message });
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
  res.status(200).json(user);
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
      res.status(200).json({ message: "User updated successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update user", error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/users`);
});
