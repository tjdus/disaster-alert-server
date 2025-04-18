import path from "path";
import fs from "fs";
import { EmergencyRoom } from "../schemas/emergencyRoom";

const DATA_DIR = path.join(__dirname, "../data");

export async function importEmergencyRoomData() {
  await EmergencyRoom.deleteMany({}); // 기존 데이터 삭제
  const filePath = path.join(DATA_DIR, "서울시 응급실 위치 정보.json"); // 데이터 파일 경로

  try {
    const fileData = fs.readFileSync(filePath, "utf-8");

    // Parse the JSON file
    const jsonData = JSON.parse(fileData);

    // Extract the "DATA" array from the JSON
    const facilities = jsonData.DATA;

    // Save each facility to MongoDB
    for (let facility of facilities) {
      const newData = new EmergencyRoom(facility);
      await newData.save();
    }
  } catch (err) {
    console.error("❌ 저장 실패:", err);
  }
}
