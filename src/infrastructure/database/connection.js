// import app from "../../app.js";
// import { MongoClient } from "mongodb";

// // const urlConnection = app.get("dbConnectionString");
const urlConnection = process.env.DB_CONNECTION_STRING;
// const client = new MongoClient(urlConnection);

// const connectionState = async () => {
//   try {
//     await client.connect();
//     // const db = await client.db().collection("diseases").find({}).toArray({});

//     // const cursor = db;
//     // console.log(cursor);
//     console.log("Connection was stablish successfully 🆗");
//   } catch (error) {
//     console.log("Cannot connect ⚠", error);
//     throw new Error("Failed to connect to database");
//   }
// };

// export default {
//   db: client.db(),
//   connectionState,
// };

import mongoose from "mongoose";


const connectionState = async () => {
  try {
    await mongoose.connect(urlConnection);
    console.log("Connection was stablish successfully 🆗");
  } catch (error) {
    console.log("Cannot connect ⚠", error);
    throw new Error("Failed to connect to database");
  }
};

export default {
  connectionState,
};