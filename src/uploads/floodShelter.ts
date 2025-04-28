import path from "path";
import fs from "fs";
import { FloodShelter } from "../schemas/floodShelter";

const DATA_DIR = path.join(__dirname, "../data");

export async function importFloodShelterData() {
  await FloodShelter.deleteMany({}); // 기존 데이터 삭제
  const filePath = path.join(DATA_DIR, "서울시 수해대피소.json"); // 데이터 파일 경로

  try {
    const fileData = fs.readFileSync(filePath, "utf-8");

    // Parse the JSON file
    const jsonData = JSON.parse(fileData);

    // Extract the "DATA" array from the JSON
    const shelters = jsonData.DATA;

    // Save each facility to MongoDB
    for (let shelter of shelters) {
      const { xcord, ycord } = shelter; // xcrd: 경도, ycrd: 위도

      // GeoJSON 형식의 location 추가
      const newData = new FloodShelter({
        ...shelter, // 기존 데이터 필드 그대로 넣기
        lat: ycord,
        lot: xcord,
        location: {
          type: "Point",
          coordinates: [parseFloat(xcord), parseFloat(ycord)], // [경도, 위도] 순서로 저장
        },
      });

      await newData.save();
    }
  } catch (err) {
    console.error("❌ 저장 실패:", err);
  }
}
