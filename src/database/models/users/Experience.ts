import { model, Schema } from "mongoose";

const experienceSchema = new Schema({
  owner: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  detail: {
    type: String,
    required: true,
  },
});

const Experience = model("Experience", experienceSchema, "experiencias");

export default Experience;
