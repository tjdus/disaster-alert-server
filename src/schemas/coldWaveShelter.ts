import mongoose from "mongoose";

// 한파 쉼터 Mongoose 스키마 정의
const coldWaveShelterSchema = new mongoose.Schema({
  sno: { type: Number },
  restarea_nm: { type: String },
  road_nm_addr: { type: String },
  lotno_addr: { type: String },
  fclt_type: { type: String },
  utztn_psblty_nope: { type: Number },
  oper_bgng_ymd: { type: Date },
  oper_end_ymd: { type: Date },
  xcrd: { type: Number },
  ycrd: { type: Number },
  lat: { type: Number },
  lot: { type: Number },
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
});

export const ColdWaveShelter = mongoose.model(
  "ColdWaveShelter",
  coldWaveShelterSchema
);
