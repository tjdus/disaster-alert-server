import mongoose from "mongoose";
import { Document } from "mongoose";

export interface IFloodShelter extends Document {
  r_seq_no: number;
  cd_area: number;
  no_equp_se: number;
  sd_nm: string;
  sgg_nm: string;
  cd_equp: number;
  gb_acmd: string;
  equp_nm: string;
  rdnmadr_cd: string;
  bdong_cd: string;
  hdong_cd: string;
  loc_sfpr_a: string;
  sect_equp: number;
  qty_cpty: number;
  xcord: number;
  ycord: number;
  xx: number;
  yy: number;
  lat: number; // 위도
  lot: number; // 경도
  cd_gubun: string;
  location: {
    type: string;
    coordinates: number[];
  };
}
const FloodShelterSchema = new mongoose.Schema({
  r_seq_no: { type: Number },
  cd_area: { type: Number },
  no_equp_se: { type: Number },
  sd_nm: { type: String },
  sgg_nm: { type: String },
  cd_equp: { type: Number },
  gb_acmd: { type: String },
  equp_nm: { type: String },
  rdnmadr_cd: { type: String },
  bdong_cd: { type: String },
  hdong_cd: { type: String },
  loc_sfpr_a: { type: String },
  sect_equp: { type: Number },
  qty_cpty: { type: Number },
  xcord: { type: Number },
  ycord: { type: Number },
  xx: { type: Number },
  yy: { type: Number },
  cd_gubun: { type: String },
  lat: { type: Number, require: true }, // 위도
  lot: { type: Number, require: true }, // 경도
  location: {
    type: { type: String, default: "Point" },
    coordinates: [Number], // [경도, 위도]
  },
});

FloodShelterSchema.index({ location: "2dsphere" });

export const FloodShelter = mongoose.model("FloodShelter", FloodShelterSchema);
