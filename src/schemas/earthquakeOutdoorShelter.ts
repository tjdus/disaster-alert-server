const mongoose = require("mongoose");

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
  lat: { type: String }, // 위도
  fcar: { type: String }, // 시설면적
  sgg_nm: { type: String }, // 시군구명
  actc_fclt_nm: { type: String }, // 수용시설명
  ycrd: { type: String }, // Y좌표
  lot: { type: String }, // 경도
});

export const EarthquakeOutdoorShelter = mongoose.model(
  "EarthquakeOutdoorShelter",
  EarthquakeOutdoorShelterSchema
);
