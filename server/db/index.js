import mongoose from "mongoose";
import { DB_Name } from "../constants.js";

const ConnectDb = async() => {
  try {
      const connected = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_Name} `)
     console.log(connected.connection.host);
  } catch (error) {
    console.log(error)
  }
}

export default ConnectDb;
