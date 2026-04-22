import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  res.send("Welcome!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
