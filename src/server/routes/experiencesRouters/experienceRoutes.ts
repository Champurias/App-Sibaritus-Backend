import express from "express";
import {
  createExperience,
  deleteExperience,
  getExperience,
  getExperiencies,
} from "../../controllers/experience/experienceController.js";

// eslint-disable-next-line new-cap
export const experienceRouter = express.Router();

experienceRouter.get("/list", getExperiencies);
experienceRouter.delete("/delete/:experienceId", deleteExperience);
experienceRouter.post("/create", createExperience);
experienceRouter.get("/:experienceId", getExperience);
