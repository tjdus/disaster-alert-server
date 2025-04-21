import path from "path";
import fs from "fs";
import { EarthquakeShelter } from "../schemas/earthquakeShelter";

const DATA_DIR = path.join(__dirname, "../data");

export async function importEarthquakeShelterData() {
  await EarthquakeShelter.deleteMany({}); // 기존 데이터 삭제
  const filePath = path.join(DATA_DIR, "서울시 지진대피소 현황.json"); // 데이터 파일 경로

  try {
    const fileData = fs.readFileSync(filePath, "utf-8");
    // Parse the JSON file
    const jsonData = JSON.parse(fileData);

    // Extract the "DATA" array from the JSON
    const shelters = jsonData.DATA;

    // Save each facility to MongoDB
    for (let shelter of shelters) {
      const newData = new EarthquakeShelter({
        ...shelter, // 기존 데이터 필드 그대로 넣기
        location: {
          type: "Point",
          coordinates: [shelter.lot, shelter.lat], // 경도, 위도 순서로 설정
        },
      });
      await newData.save();
    }
  } catch (err) {
    console.error("❌ 저장 실패:", err);
  }
}
