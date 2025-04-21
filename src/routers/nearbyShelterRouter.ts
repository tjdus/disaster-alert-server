import { Router } from "express";
import mongoose, { Model } from "mongoose";
import {
  EarthquakeOutdoorShelter,
  IEarthquakeOutdoorShelter,
} from "../schemas/earthquakeOutdoorShelter";
import { calculateDistance } from "../utils";
import {
  InvalidRequestErrorResponse,
  ListResponse,
  RetrieveErrorResponse,
} from "../interfaces/response";
import {
  EarthquakeShelter,
  IEarthquakeShelter,
} from "../schemas/earthquakeShelter";
import { ColdWaveShelter, IColdWaveShelter } from "../schemas/coldWaveShelter";
import { ShelterWithDistance } from "../interfaces/extended";
import HeatShelter, { IHeatShelter } from "../schemas/heatShelter";
import { DustShelter, IDustShelter } from "../schemas/dustShelter";
import { EmergencyRoom, IEmergencyRoom } from "../schemas/emergencyRoom";

const MAX_DISTANCE_KM = 5; // Default 5km radius
const MAX_RESULTS = 20; // Limit results to prevent large responses

export const nearbyShelterRouter = (...args: any[]) => {
  const router = Router();
  return router
    .get("/earthquake-outdoor-shelters", async (req, res) => {
      try {
        const { lat, lon, distance = MAX_DISTANCE_KM } = req.query;

        // Validate parameters
        if (!lat || !lon) {
          return res
            .status(400)
            .json(InvalidRequestErrorResponse("경도, 위도"));
        }

        // Convert to numbers
        const latitude = parseFloat(lat as string);
        const longitude = parseFloat(lon as string);
        const searchDistance = Math.min(parseFloat(distance as string), 20); // Cap at 20km

        // Find shelters within the specified radius
        const shelters = await EarthquakeOutdoorShelter.aggregate([
          {
            $geoNear: {
              near: {
                type: "Point",
                coordinates: [longitude, latitude], // [경도, 위도]
              },
              distanceField: "distance", // 거리 정보 저장
              maxDistance: searchDistance * 1000, // 최대 거리 설정 (단위: 미터, km에서 변환)
              spherical: true, // 구면 좌표계 사용
            },
          },
          {
            $sort: { distance: 1 }, // 가까운 순으로 정렬
          },
          {
            $limit: MAX_RESULTS, // 최대 결과 개수 제한
          },
        ]);

        const response: ListResponse<IEarthquakeOutdoorShelter> = {
          data: shelters,
        };

        res.json(response);
      } catch (e) {
        console.error("Error finding nearby shelters:", e);
        res.status(500).json(RetrieveErrorResponse);
      }
    })
    .get("/earthquake-shelters", async (req, res) => {
      try {
        const { lat, lon, distance = MAX_DISTANCE_KM } = req.query;

        // Validate parameters
        if (!lat || !lon) {
          return res
            .status(400)
            .json(InvalidRequestErrorResponse("경도, 위도"));
        }

        // Convert to numbers
        const latitude = parseFloat(lat as string);
        const longitude = parseFloat(lon as string);
        const searchDistance = Math.min(parseFloat(distance as string), 20); // Cap at 20km

        // Find shelters within the specified radius
        const shelters = await EarthquakeShelter.aggregate([
          {
            $geoNear: {
              near: {
                type: "Point",
                coordinates: [longitude, latitude], // [경도, 위도]
              },
              distanceField: "distance", // 거리 정보 저장
              maxDistance: searchDistance * 1000, // 최대 거리 설정 (단위: 미터, km에서 변환)
              spherical: true, // 구면 좌표계 사용
            },
          },
          {
            $sort: { distance: 1 }, // 가까운 순으로 정렬
          },
          {
            $limit: MAX_RESULTS, // 최대 결과 개수 제한
          },
        ]);

        const response: ListResponse<IEarthquakeShelter> = {
          data: shelters,
        };

        res.json(response);
      } catch (e) {
        console.error("Error finding nearby shelters:", e);
        res.status(500).json(RetrieveErrorResponse);
      }
    })
    .get("/coldwave-shelters", async (req, res) => {
      try {
        const { lat, lon, distance = MAX_DISTANCE_KM } = req.query;

        // Validate parameters
        if (!lat || !lon) {
          return res
            .status(400)
            .json(InvalidRequestErrorResponse("경도, 위도"));
        }

        // Convert to numbers
        const latitude = parseFloat(lat as string);
        const longitude = parseFloat(lon as string);
        const searchDistance = Math.min(parseFloat(distance as string), 20); // Cap at 20km

        // Find shelters within the specified radius
        const shelters = await ColdWaveShelter.aggregate([
          {
            $geoNear: {
              near: {
                type: "Point",
                coordinates: [longitude, latitude], // [경도, 위도]
              },
              distanceField: "distance", // 거리 정보 저장
              maxDistance: searchDistance * 1000, // 최대 거리 설정 (단위: 미터, km에서 변환)
              spherical: true, // 구면 좌표계 사용
            },
          },
          {
            $sort: { distance: 1 }, // 가까운 순으로 정렬
          },
          {
            $limit: MAX_RESULTS, // 최대 결과 개수 제한
          },
        ]);

        const response: ListResponse<IColdWaveShelter> = {
          data: shelters,
        };

        res.json(response);
      } catch (e) {
        console.error("Error finding nearby shelters:", e);
        res.status(500).json(RetrieveErrorResponse);
      }
    })
    .get("/heatwave-shelters", async (req, res) => {
      try {
        const { lat, lon, distance = MAX_DISTANCE_KM } = req.query;

        // Validate parameters
        if (!lat || !lon) {
          return res
            .status(400)
            .json(InvalidRequestErrorResponse("경도, 위도"));
        }

        // Convert to numbers
        const latitude = parseFloat(lat as string);
        const longitude = parseFloat(lon as string);
        const searchDistance = Math.min(parseFloat(distance as string), 20); // Cap at 20km

        // Find shelters within the specified radius
        const shelters = await HeatShelter.aggregate([
          {
            $geoNear: {
              near: {
                type: "Point",
                coordinates: [longitude, latitude], // [경도, 위도]
              },
              distanceField: "distance", // 거리 정보 저장
              maxDistance: searchDistance * 1000, // 최대 거리 설정 (단위: 미터, km에서 변환)
              spherical: true, // 구면 좌표계 사용
            },
          },
          {
            $sort: { distance: 1 }, // 가까운 순으로 정렬
          },
          {
            $limit: MAX_RESULTS, // 최대 결과 개수 제한
          },
        ]);

        const response: ListResponse<IHeatShelter> = {
          data: shelters,
        };

        res.json(response);
      } catch (e) {
        console.error("Error finding nearby shelters:", e);
        res.status(500).json(RetrieveErrorResponse);
      }
    })
    .get("/coldwave-shelters", async (req, res) => {
      try {
        const { lat, lon, distance = MAX_DISTANCE_KM } = req.query;

        // Validate parameters
        if (!lat || !lon) {
          return res
            .status(400)
            .json(InvalidRequestErrorResponse("경도, 위도"));
        }

        // Convert to numbers
        const latitude = parseFloat(lat as string);
        const longitude = parseFloat(lon as string);
        const searchDistance = Math.min(parseFloat(distance as string), 20); // Cap at 20km

        // Find shelters within the specified radius
        const shelters = await ColdWaveShelter.aggregate([
          {
            $geoNear: {
              near: {
                type: "Point",
                coordinates: [longitude, latitude], // [경도, 위도]
              },
              distanceField: "distance", // 거리 정보 저장
              maxDistance: searchDistance * 1000, // 최대 거리 설정 (단위: 미터, km에서 변환)
              spherical: true, // 구면 좌표계 사용
            },
          },
          {
            $sort: { distance: 1 }, // 가까운 순으로 정렬
          },
          {
            $limit: MAX_RESULTS, // 최대 결과 개수 제한
          },
        ]);

        const response: ListResponse<IColdWaveShelter> = {
          data: shelters,
        };

        res.json(response);
      } catch (e) {
        console.error("Error finding nearby shelters:", e);
        res.status(500).json(RetrieveErrorResponse);
      }
    })
    .get("/dust-shelters", async (req, res) => {
      try {
        const { lat, lon, distance = MAX_DISTANCE_KM } = req.query;

        // Validate parameters
        if (!lat || !lon) {
          return res
            .status(400)
            .json(InvalidRequestErrorResponse("경도, 위도"));
        }

        // Convert to numbers
        const latitude = parseFloat(lat as string);
        const longitude = parseFloat(lon as string);
        const searchDistance = Math.min(parseFloat(distance as string), 20); // Cap at 20km

        // Find shelters within the specified radius
        const shelters = await DustShelter.aggregate([
          {
            $geoNear: {
              near: {
                type: "Point",
                coordinates: [longitude, latitude], // [경도, 위도]
              },
              distanceField: "distance", // 거리 정보 저장
              maxDistance: searchDistance * 1000, // 최대 거리 설정 (단위: 미터, km에서 변환)
              spherical: true, // 구면 좌표계 사용
            },
          },
          {
            $sort: { distance: 1 }, // 가까운 순으로 정렬
          },
          {
            $limit: MAX_RESULTS, // 최대 결과 개수 제한
          },
        ]);

        const response: ListResponse<IDustShelter> = {
          data: shelters,
        };

        res.json(response);
      } catch (e) {
        console.error("Error finding nearby shelters:", e);
        res.status(500).json(RetrieveErrorResponse);
      }
    })
    .get("/emergency-rooms", async (req, res) => {
      try {
        const { lat, lon, distance = MAX_DISTANCE_KM } = req.query;

        // Validate parameters
        if (!lat || !lon) {
          return res
            .status(400)
            .json(InvalidRequestErrorResponse("경도, 위도"));
        }

        // Convert to numbers
        const latitude = parseFloat(lat as string);
        const longitude = parseFloat(lon as string);
        const searchDistance = Math.min(parseFloat(distance as string), 20); // Cap at 20km

        // Find shelters within the specified radius
        const shelters = await EmergencyRoom.aggregate([
          {
            $geoNear: {
              near: {
                type: "Point",
                coordinates: [longitude, latitude], // [경도, 위도]
              },
              distanceField: "distance", // 거리 정보 저장
              maxDistance: searchDistance * 1000, // 최대 거리 설정 (단위: 미터, km에서 변환)
              spherical: true, // 구면 좌표계 사용
            },
          },
          {
            $sort: { distance: 1 }, // 가까운 순으로 정렬
          },
          {
            $limit: MAX_RESULTS, // 최대 결과 개수 제한
          },
        ]);

        const response: ListResponse<IEmergencyRoom> = {
          data: shelters,
        };

        res.json(response);
      } catch (e) {
        console.error("Error finding nearby shelters:", e);
        res.status(500).json(RetrieveErrorResponse);
      }
    });
};
