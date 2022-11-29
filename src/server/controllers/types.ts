import type { JwtPayload } from "jsonwebtoken";
import type mongoose from "mongoose";

export interface RegisterUser {
  username: string;
  password: string;
  email: string;
}

export interface UserResponse {
  username: string;
  email: string;
  id: mongoose.Types.ObjectId;
}

export interface Credentials {
  username: string;
  password: string;
}

export interface UserTokenPayload extends JwtPayload {
  id: string;
  username: string;
}

export interface RegisterExperience {
  owner: string;
  location: string;
  price: number;
  detail: string;
}
