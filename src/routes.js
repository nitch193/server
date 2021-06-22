import express from "express";
// Controller imports
import basicController from "./Controllers/basicController";
import userController from "./Controllers/userController";
import postController from "./Controllers/postController";
import commentController from "./Controllers/commentController";
import jwt from "./middlewares/authmiddleware";

const routes = express();

routes.get("/", basicController.get);

routes.post("/signup", userController.signup);

routes.post("/login", userController.login);

routes.post("/post", jwt, postController.post);

routes.get("/posts", postController.getAll);

routes.post("/comment", jwt, commentController.post);

routes.get("/postbytopic", postController.getByTopic);

routes.get("/postbyuser", jwt, postController.getByUser);

routes.get("/postupvote", jwt, postController.upvote);

routes.get("/postdownvote", jwt, postController.downvote);

routes.get("/postunvote", jwt, postController.unvote);

routes.delete("/deletepost", jwt, postController.destroy);

routes.delete("/deletecomment", jwt, commentController.destroy);

export default routes;
