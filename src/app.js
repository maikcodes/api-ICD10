import express from "express";
import "dotenv/config";

const app = express();

// settings
app.set("port", process.env.SERVER_PORT || 4000);
// app.set("dbConnectionString", process.env.DB_CONNECTION_STRING);
app.use(express.json());

// import diseases from "./entities/diseases.js";
app.get("/", async (req, res) => {
  // const all = await diseases.getAll();
  res.send({});
});

export default app;
