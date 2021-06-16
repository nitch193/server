import express from "express";
// Controller imports
import basicController from "./Controllers/basicController";
import userController from "./Controllers/userController";
import postController from "./Controllers/postController";
import commentController from "./Controllers/commentController";

const routes = express();

routes.get("/", basicController.get);

routes.post("/signup", userController.post);

routes.post("/post", postController.post);

routes.get("/posts", postController.getAll);

routes.post("/comment", commentController.post);

export default routes;
