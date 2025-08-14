import { z } from "zod";

export const errorMiddleware = (err, req, res, next) => {
  if (err instanceof z.ZodError) {
    return res.status(400).json({
      status: 400,
      message: "資料驗證發生錯誤",
      data: err.issues,
    });
  }

  if (err.code === "P2002") {
    return res.status(400).json({
      status: 400,
      message: "資料唯一性衝突",
      data: err.message,
    });
  }

  if (err.code === "P2003") {
    return res.status(400).json({
      status: 400,
      message: "資料關聯性衝突",
      data: err.meta,
    });
  }

  if (err.code === "P2025") {
    return res.status(404).json({
      status: 404,
      message: "查無資料",
      data: err.message,
    });
  }

  res.status(500).json({
    status: 500,
    message: "伺服器內部錯誤",
    data: err.message,
  });
};
