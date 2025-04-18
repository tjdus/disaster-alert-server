const mongoose = require("mongoose");

const EarthquakeShelterSchema = new mongoose.Schema({
  fclt_nm: { type: String }, // 시설명
  mng_dept_nm: { type: String }, // 관리부서
  se_nm: { type: String }, // 구분명 (예: 지진실내구호소)
  ctpv_nm: { type: String }, // 시도명
  lot: { type: String }, // 경도
  fcar: { type: String }, // 시설면적
  se: { type: Number }, // 구분
  shlt_id: { type: Number }, // 피난처 ID
  daddr: { type: String }, // 상세주소
  sgg_nm: { type: String }, // 시군구명
  lat: { type: String }, // 위도
});

export const EarthquakeShelter = mongoose.model(
  "EarthquakeShelter",
  EarthquakeShelterSchema
);
