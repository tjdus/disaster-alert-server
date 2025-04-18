const mongoose = require("mongoose");
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
});

export const DustShelter = mongoose.model("DustShelter", DustShelterSchema);
