import dotenv from "dotenv";

dotenv.config();

const enviroment = {
  url: process.env.MONGODB_URL,
  port: process.env.PORT,
  debug: process.env.DEBUG,
};

export default enviroment;
