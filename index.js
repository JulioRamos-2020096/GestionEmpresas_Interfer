import { config } from "dotenv";
import { initServer } from "./configs/server.js";
import { createDefaultUser } from "./user/useradmin.default.js";

config();
initServer();
createDefaultUser();