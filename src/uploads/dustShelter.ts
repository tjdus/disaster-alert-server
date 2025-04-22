import path from "path";
import fs from "fs";
import { DustShelter } from "../schemas/dustShelter";
import proj4 from "proj4";

const DATA_DIR = path.join(__dirname, "../data");

export async function importDustShelterData() {
  await DustShelter.deleteMany({}); // 기존 데이터 삭제
  const filePath = path.join(DATA_DIR, "서울시 미세먼지대피소.json"); // 데이터 파일 경로

  try {
    const fileData = fs.readFileSync(filePath, "utf-8");

    // Parse the JSON file
    const jsonData = JSON.parse(fileData);

    // Extract the "DATA" array from the JSON
    const shelters = jsonData.DATA;

    const utmProjection =
      "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +units=m +no_defs";
    const wgs84Projection = "+proj=longlat +datum=WGS84 +no_defs";

    // Save each facility to MongoDB
    for (let shelter of shelters) {
      const { xcrd, ycrd } = shelter; // xcrd: 경도, ycrd: 위도

      // 좌표 변환 (UTM 좌표를 WGS84로 변환)
      const [longitude, latitude] = proj4(utmProjection, wgs84Projection, [
        xcrd,
        ycrd,
      ]);

      // GeoJSON 형식의 location 추가
      const newData = new DustShelter({
        ...shelter, // 기존 데이터 필드 그대로 넣기
        lat: latitude,
        lot: longitude,
        location: {
          type: "Point",
          coordinates: [longitude, latitude], // [경도, 위도] 순서로 저장
        },
      });

      await newData.save();
    }
  } catch (err) {
    console.error("❌ 저장 실패:", err);
  }
}
