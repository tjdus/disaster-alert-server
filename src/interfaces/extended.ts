import { Document } from "mongoose";

// 모든 쉼터 타입의 기본 속성을 정의하는 인터페이스
export interface GeoLocation {
  lat: number;
  lot: number;
}

// dist 속성을 추가한 확장 타입
export interface WithDistance {
  dist?: number;
}

// Mongoose Document를 확장하면서 거리 정보를 추가할 수 있는 타입
export type ShelterWithDistance<T extends Document & GeoLocation> = T &
  WithDistance;
