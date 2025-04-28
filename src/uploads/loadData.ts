import fs from "fs";
import path from "path";
import mongoose, { models } from "mongoose";
import { connectAndUseDB } from "../mongodb";
import { importColdWaveShelterData } from "./coldWaveShelter";
import { importDustShelterData } from "./dustShelter";
import { importEarthquakeShelterData } from "./earthquakeShelter";
import { importEarthquakeOutdoorShelterData } from "./earthquakeOutdoorShelter";
import { importHeatShelterData } from "./heatShelter";
import { importEmergencyRoomData } from "./emergencyRoom";
import { importFloodShelterData } from "./floodShelter";

const DATA_DIR = path.join(__dirname, "../data");
const MONGO_URL =
  process.env.MONGO_URL || "mongodb://localhost:27017/disaster-alert";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("✅ MongoDB 연결 성공");
  } catch (error) {
    console.error("❌ MongoDB 연결 실패:", error);
    process.exit(1);
  }
};

async function importData() {
  await connectDB();

  await importColdWaveShelterData();
  await importDustShelterData();
  await importEarthquakeShelterData();
  await importEarthquakeOutdoorShelterData();
  await importHeatShelterData();
  await importEmergencyRoomData();
  await importFloodShelterData();

  mongoose.disconnect();
}

importData();
