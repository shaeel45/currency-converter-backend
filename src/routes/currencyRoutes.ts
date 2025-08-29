import { Router } from "express";
import getConversion from "../controllers/currencyController.js";

const router = Router();

router.get("/", getConversion);

export default router;
