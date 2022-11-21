import enviroment from "./loadEnviroment.js";
import connectToDataBase from "./database/index.js";
import startServer from "./server/index.js";

const { url, port } = enviroment;

await connectToDataBase(url);
await startServer(port);
