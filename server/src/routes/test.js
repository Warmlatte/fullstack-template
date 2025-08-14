import express from "express";

const router = express.Router();

// 測試 API
router.get("/ping", (_req, res) => {
  res.json({ message: "Pong💥 Backend is connected successfully!" });
});

export default router;
