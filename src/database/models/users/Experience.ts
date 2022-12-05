import type { InferSchemaType } from "mongoose";
import { model, Schema } from "mongoose";

const experienceSchema = new Schema({
  owner: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
  },
  pictureBackUp: {
    type: String,
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
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});
export type ExperienceStructure = InferSchemaType<typeof experienceSchema>;

export const Experience = model("Experience", experienceSchema, "experiencias");
