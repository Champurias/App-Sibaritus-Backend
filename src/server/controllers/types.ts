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
