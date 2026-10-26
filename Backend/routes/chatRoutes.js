import express from "express";
import { sendChatMessage } from "../controllers/chatController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", sendChatMessage);

export default router;
