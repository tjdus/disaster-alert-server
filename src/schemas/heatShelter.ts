const mongoose = require("mongoose");

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
  lot: { type: Number },
  restarea_nm: { type: String },
  rmrk: { type: String },
  oper_bgng_ymd: { type: String },
  lat: { type: Number },
});

const HeatShelter = mongoose.model("HeatShelter", HeatShelterSchema);

export default HeatShelter;
