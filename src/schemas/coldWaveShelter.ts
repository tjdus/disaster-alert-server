import mongoose from "mongoose";
import { Document } from "mongoose";

export interface IColdWaveShelter extends Document {
  sno?: number; // 시설번호
  restarea_nm?: string; // 시설명
  road_nm_addr?: string; // 도로명주소
  lotno_addr?: string; // 지번주소
  fclt_type?: string; // 시설유형
  utztn_psblty_nope?: number; // 수용인원
  oper_bgng_ymd?: Date; // 운영시작일
  oper_end_ymd?: Date; // 운영종료일
  xcrd?: number; // X좌표
  ycrd?: number; // Y좌표
  lat: number; // 위도
  lot: number; // 경도
  wd_opn_yn?: string; // 평일 운영 여부
  wd_opn_hrm?: string; // 평일 운영 시작 시간
  wd_end_hrm?: string; // 평일 운영 종료 시간
  sun_opn_yn?: string; // 일요일 운영 여부
  sun_opn_hrm?: string; // 일요일 운영 시작 시간
  sun_end_hrm?: string; // 일요일 운영 종료 시간
  sat_opn_yn?: string; // 토요일 운영 여부
  sat_opn_hrm?: string; // 토요일 운영 시작 시간
  sat_end_hrm?: string; // 토요일 운영 종료 시간
  lhldy_opn_yn?: string; // 공휴일 운영 여부
  lhldy_opn_hrm?: string; // 공휴일 운영 시작 시간
  lhldy_end_hrm?: string; // 공휴일 운영 종료 시간
  nght_opn?: string; // 야간 운영 여부
  rmrk?: string; // 비고
  use_yn?: string; // 사용 여부
}

// 한파 쉼터 Mongoose 스키마 정의
const ColdWaveShelterSchema = new mongoose.Schema({
  sno: { type: Number },
  restarea_nm: { type: String },
  road_nm_addr: { type: String },
  lotno_addr: { type: String },
  fclt_type: { type: String },
  utztn_psblty_nope: { type: Number, default: 0 },
  oper_bgng_ymd: { type: Date },
  oper_end_ymd: { type: Date },
  xcrd: { type: Number },
  ycrd: { type: Number },
  lat: { type: Number, require: true },
  lot: { type: Number, require: true },
  wd_opn_yn: { type: String },
  wd_opn_hrm: { type: String },
  wd_end_hrm: { type: String },
  sun_opn_yn: { type: String },
  sun_opn_hrm: { type: String },
  sun_end_hrm: { type: String },
  sat_opn_yn: { type: String },
  sat_opn_hrm: { type: String },
  sat_end_hrm: { type: String },
  lhldy_opn_yn: { type: String },
  lhldy_opn_hrm: { type: String },
  lhldy_end_hrm: { type: String },
  nght_opn: { type: String },
  rmrk: { type: String },
  use_yn: { type: String },
  location: {
    // GeoJSON 형식으로 변환된 위치 정보
    type: { type: String, default: "Point" },
    coordinates: [Number], // [경도, 위도]
  },
});

ColdWaveShelterSchema.index({ location: "2dsphere" });

export const ColdWaveShelter = mongoose.model(
  "ColdWaveShelter",
  ColdWaveShelterSchema
);
