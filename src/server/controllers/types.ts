import type mongoose from "mongoose";

export interface RegisterUser {
  name: string;
  password: string;
  email: string;
}

export interface UserResponse {
  name: string;
  email: string;
  id: mongoose.Types.ObjectId;
}

export interface Credentials {
  username: string;
  password: string;
}
