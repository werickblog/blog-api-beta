import dotenv from "dotenv";

dotenv.config();

export default {
  secretKey: process.env.SECRET_KEY
};
