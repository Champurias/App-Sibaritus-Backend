import mongoose from "mongoose";
import enviroment from "../loadEnviroment.js";
import debugCreator from "debug";
import chalk from "chalk";

const debug = debugCreator(`${enviroment.debug}database`);

const connectToDataBase = async (url: string) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    await mongoose.connect(url);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    mongoose.set("debug", process.env.DEBUG === "true");
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    mongoose.set("toJSON", {
      virtuals: true,
      transform(doc, ret) {
        delete ret._id;
        delete ret.__v;

        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return ret;
      },
    });
    debug(chalk.blueBright("Connected to the data base"));
  } catch {
    debug(chalk.red("Error connecting with the data base"));
  }
};

export default connectToDataBase;
