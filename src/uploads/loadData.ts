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
import dotenv from "dotenv";

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
