import mongoose from "mongoose";
import { Document } from "mongoose";

export interface IHeatShelter extends Document {
  fclt_type?: string; // 시설유형
  ycrd?: number; // Y좌표
  road_nm_addr?: string; // 도로명주소
  rgn_cd?: string; // 지역코드
  utztn_psblty_nope?: number; // 수용인원
  oper_end_ymd?: string; // 운영종료일
  area?: string; // 지역
  lotno_daddr?: string; // 지번주소
  yr?: string; // 연도
  xcrd?: number; // X좌표
  lot: number; // 경도
  restarea_nm?: string; // 시설명
  rmrk?: string; // 비고
  oper_bgng_ymd?: string; // 운영시작일
  lat: number; // 위도
}

const HeatShelterSchema = new mongoose.Schema({
  fclt_type: { type: String },
  ycrd: { type: Number },
  road_nm_addr: { type: String },
  rgn_cd: { type: String },
  utztn_psblty_nope: { type: Number },
  oper_end_ymd: { type: String },
  area: { type: String },
  lotno_daddr: { type: String },
  yr: { type: String },
  xcrd: { type: Number },
  lot: { type: Number, require: true },
  restarea_nm: { type: String },
  rmrk: { type: String },
  oper_bgng_ymd: { type: String },
  lat: { type: Number, require: true },
  location: {
    // GeoJSON 형식으로 변환된 위치 정보
    type: { type: String, default: "Point" },
    coordinates: [Number], // [경도, 위도]
  },
});

HeatShelterSchema.index({ location: "2dsphere" });

const HeatShelter = mongoose.model("HeatShelter", HeatShelterSchema);

export default HeatShelter;
