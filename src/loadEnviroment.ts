import dotenv from "dotenv";

dotenv.config();

const enviroment = {
  url: process.env.MONGODB_URL,
  port: process.env.PORT,
  debug: process.env.DEBUG,
  jwtSecret: process.env.JWT_SECRET,
};

export default enviroment;
