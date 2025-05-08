import { createServer } from "http"; // Express 앱을 이걸로 감싸서 서버를 만들 수 있음.
import { createExpressApp } from "./express"; //이 함수 안에서 라우터(API 경로)들도 등록되어 있음.
import type { MongoDB } from "./mongodb"; // MongoDB 연결 관련 코드
import { connectAndUseDB } from "./mongodb"; // MongoDB 연결 관련 코드
import mongoose from "mongoose"; // MongoDB와 실제 연결을 담당할 mongoose 라이브러리
import { makeDir } from "./utils";
import { getPublicDirPath } from "./config";
import dotenv from "dotenv";

const PORT = process.env.PORT || 4000;

makeDir(getPublicDirPath());

dotenv.config();

export const connectDB = async () => {
  try {
    const mongodb = process.env.MONGO_URL || "";
    await mongoose.connect(mongodb);
    console.log("✅ MongoDB 연결 성공");
  } catch (error) {
    console.error("❌ MongoDB 연결 실패:", error);
    process.exit(1);
  }
};

const startServer = async () => {
  await connectDB();
  const app = createExpressApp();

  // Create HTTP server and listen
  const server = createServer(app);

  server.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
};
//DB 연결하고, Express 앱 만들고, 서버 열고 기다리는 구조

startServer().catch((err) => {
  console.error("❌ Failed to start server:", err);
  process.exit(1);
});
// / 서버 시작 실패하면 에러 출력하고 종료
