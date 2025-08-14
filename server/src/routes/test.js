import express from "express";

const router = express.Router();

// 測試 API
router.get("/ping", (_req, res) => {
  res.json({ message: "Pong💥 Backend is connected successfully!" });
});

<<<<<<< HEAD
export default router;
=======
export default router;
>>>>>>> 038d29b7c025044669326c8d9d5b262c9d06317e
