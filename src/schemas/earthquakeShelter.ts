import mongoose from "mongoose";
import { Document } from "mongoose";

export interface IEarthquakeShelter extends Document {
  fclt_nm?: string; // 시설명
  mng_dept_nm?: string; // 관리부서
  se_nm?: string; // 구분명 (예: 지진실내구호소)
  ctpv_nm?: string; // 시도명
  lot: number; // 경도
  fcar?: string; // 시설면적
  se?: number; // 구분
  shlt_id?: number; // 피난처 ID
  daddr?: string; // 상세주소
  sgg_nm?: string; // 시군구명
  lat: number; // 위도
}

const EarthquakeShelterSchema = new mongoose.Schema({
  fclt_nm: { type: String }, // 시설명
  mng_dept_nm: { type: String }, // 관리부서
  se_nm: { type: String }, // 구분명 (예: 지진실내구호소)
  ctpv_nm: { type: String }, // 시도명
  lot: { type: Number, require: true }, // 경도
  fcar: { type: String }, // 시설면적
  se: { type: Number }, // 구분
  shlt_id: { type: Number }, // 피난처 ID
  daddr: { type: String }, // 상세주소
  sgg_nm: { type: String }, // 시군구명
  lat: { type: Number, require: true }, // 위도
  location: {
    // GeoJSON 형식으로 변환된 위치 정보
    type: { type: String, default: "Point" },
    coordinates: [Number], // [경도, 위도]
  },
});

EarthquakeShelterSchema.index({ location: "2dsphere" });

export const EarthquakeShelter = mongoose.model(
  "EarthquakeShelter",
  EarthquakeShelterSchema
);
