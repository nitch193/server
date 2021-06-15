import express from "express";
// Controller imports
import basicController from "./Controllers/basicController";
import userController from "./Controllers/userController";

const routes = express();

routes.get("/", basicController.get);

routes.post("/signup", userController.post);

export default routes;
