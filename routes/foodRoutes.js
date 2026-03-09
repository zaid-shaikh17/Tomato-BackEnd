import express from "express";
import { addFood, listFoods, removeFood } from "../controllers/foodController.js";

const foodRouter = express.Router();

foodRouter.post("/add", addFood);
foodRouter.get("/list", listFoods);
foodRouter.delete("/remove", removeFood);

export default foodRouter;
