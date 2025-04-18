const mongoose = require("mongoose");

const EmergencyRoomSchema = new mongoose.Schema({
  dutyinf: { type: String }, // 기관설명상세
  dutytel3: { type: String }, // 응급실전화
  dutytel1: { type: String }, // 대표전화1
  dutydivnam: { type: String }, // 병원분류명
  dutytime2c: { type: String }, // 진료시간(화요일)C
  dutyeryn: { type: String }, // 응급실운영여부
  dutytime6c: { type: String }, // 진료시간(토요일)C
  dutytime8c: { type: String }, // 진료시간(공휴일)C
  dutytime4c: { type: String }, // 진료시간(목요일)C
  wgs84lat: { type: String }, // 병원위도
  dutydiv: { type: String }, // 병원분류
  dutytime1s: { type: String }, // 진료시간(월요일)S
  wgs84lon: { type: String }, // 병원경도
  dutytime5s: { type: String }, // 진료시간(금요일)S
  dutytime8s: { type: String }, // 진료시간(공휴일)S
  postcdn2: { type: String }, // 우편번호2
  postcdn1: { type: String }, // 우편번호1
  dutytime3s: { type: String }, // 진료시간(수요일)S
  dutytime3c: { type: String }, // 진료시간(수요일)C
  dutyemclsname: { type: String }, // 응급의료기관코드명
  dutytime1c: { type: String }, // 진료시간(월요일)C
  dutytime7s: { type: String }, // 진료시간(일요일)S
  dutyemcls: { type: String }, // 응급의료기관코드
  dutyname: { type: String }, // 기관명
  dutyetc: { type: String }, // 비고
  hpid: { type: String }, // 기관ID
  dutytime5c: { type: String }, // 진료시간(금요일)C
  dutyaddr: { type: String }, // 주소
  dutytime7c: { type: String }, // 진료시간(일요일)C
  dutytime2s: { type: String }, // 진료시간(화요일)S
  work_dttm: { type: Number }, // 작업시간
  dutytime6s: { type: String }, // 진료시간(토요일)S
  dutytime4s: { type: String }, // 진료시간(목요일)S
  dutymapimg: { type: String }, // 간이약도
});

export const EmergencyRoom = mongoose.model(
  "EmergencyRoom",
  EmergencyRoomSchema
);
