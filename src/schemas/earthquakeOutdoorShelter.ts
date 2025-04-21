import mongoose from "mongoose";
import { Document } from "mongoose";
export interface IEarthquakeOutdoorShelter extends Document {
  fclt_no?: string; // 시설번호
  fclt_sn?: string; // 시설일련번호
  stdg_cd?: string; // 법정동코드
  road_nm_addr_cd?: string; // 도로명주소코드
  dong_cd?: string; // 행정동코드
  rgn_cd?: string; // 지역코드
  daddr?: string; // 상세주소
  xcrd?: string; // X좌표
  ctpv_nm?: string; // 시도명
  lat: number; // 위도
  fcar?: string; // 시설면적
  sgg_nm?: string; // 시군구명
  actc_fclt_nm?: string; // 수용시설명
  ycrd?: string; // Y좌표
  lot: number; // 경도
}

const EarthquakeOutdoorShelterSchema = new mongoose.Schema({
  fclt_no: { type: String }, // 시설번호
  fclt_sn: { type: String }, // 시설일련번호
  stdg_cd: { type: String }, // 법정동코드
  road_nm_addr_cd: { type: String }, // 도로명주소코드
  dong_cd: { type: String }, // 행정동코드
  rgn_cd: { type: String }, // 지역코드
  daddr: { type: String }, // 상세주소
  xcrd: { type: String }, // X좌표
  ctpv_nm: { type: String }, // 시도명
  lat: { type: Number }, // 위도
  fcar: { type: String }, // 시설면적
  sgg_nm: { type: String }, // 시군구명
  actc_fclt_nm: { type: String }, // 수용시설명
  ycrd: { type: String }, // Y좌표
  lot: { type: Number }, // 경도
  location: {
    // GeoJSON 형식으로 변환된 위치 정보
    type: { type: String, default: "Point" },
    coordinates: [Number], // [경도, 위도]
  },
});

EarthquakeOutdoorShelterSchema.index({ location: "2dsphere" });

export const EarthquakeOutdoorShelter = mongoose.model(
  "EarthquakeOutdoorShelter",
  EarthquakeOutdoorShelterSchema
);
