import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import client from "./database/mongodb.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  }),
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// create user data
const userCollection = client.db("amar-dokan").collection("users");

app.post("/users", async (req, res) => {
  const { username, email } = req.body;
  const role = "customer";
  const joined = new Date();
  try {
    await userCollection.insertOne({ username, email, role, joined });
    res.status(200).send({ success: true });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).send({ success: false, message: "User Already Exists" });
    }
    res.status(500).send({ success: false, message: "Failed To Create User" });
  }
});

//get all user data
app.get("/users/getAll", async (req, res) => {
  try {
    const customer = await userCollection.find({ role: "customer" }).toArray();
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: "Can't get users" });
  }
});
