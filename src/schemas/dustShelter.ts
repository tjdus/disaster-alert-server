import mongoose from "mongoose";
import { Document } from "mongoose";

export interface IDustShelter extends Document {
  fclt_nm?: string; // 시설명
  area?: string; // 지역
  sno?: number; // 시설번호
  fclt_type?: string; // 시설유형
  dong_nm?: string; // 동명
  wd_utztn_hrm?: string; // 평일 운영 시간
  ycrd?: number; // Y좌표
  mbsh_yn?: string; // 시설 운영 여부
  xcrd?: number; // X좌표
  we_utztn_hrm?: string; // 주말 운영 시간
  addr?: string; // 주소
  rmrk?: string; // 비고
  utztn_psblty_nope?: string; // 수용 가능 인원
}

const DustShelterSchema = new mongoose.Schema({
  fclt_nm: { type: String },
  area: { type: String },
  sno: { type: Number },
  fclt_type: { type: String },
  dong_nm: { type: String },
  wd_utztn_hrm: { type: String },
  ycrd: { type: Number },
  mbsh_yn: { type: String },
  xcrd: { type: Number },
  we_utztn_hrm: { type: String },
  addr: { type: String },
  rmrk: { type: String },
  utztn_psblty_nope: { type: String },
  location: {
    // GeoJSON 형식으로 변환된 위치 정보
    type: { type: String, default: "Point" },
    coordinates: [Number], // [경도, 위도]
  },
});

DustShelterSchema.index({ location: "2dsphere" });

export const DustShelter = mongoose.model("DustShelter", DustShelterSchema);
