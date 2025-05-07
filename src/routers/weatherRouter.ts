import type { MongoDB } from "../mongodb";
import { stringToObjectId } from "../mongodb";
import { Router } from "express";

export interface WeatherItem {
  baseDate: string; // YYYYMMDD
  baseTime: string; // HHMM
  category: string; // 예: TMP, UUU, VVV, VEC 등
  fcstDate: string; // YYYYMMDD
  fcstTime: string; // HHMM
  fcstValue: string; // 예: 15, -0.6, 3.4 등
  nx: number;
  ny: number;
}

export interface WeatherResponse {
  response: {
    header: {
      resultCode: string;
      resultMsg: string;
    };
    body: {
      dataType: string;
      items: {
        item: WeatherItem[];
      };
    };
  };
}

interface WeatherParams {
  serviceKey?: string;
  pageNo?: number;
  numOfRows?: number;
  dataType?: "XML" | "JSON";
  base_date: string;
  base_time: string;
  nx: string;
  ny: string;
}

export async function getWeatherData(params: WeatherParams) {
  const {
    serviceKey = process.env.WEATHER_API_SERVICE_KEY || "",
    pageNo = 1,
    numOfRows = 1000,
    dataType = "JSON",
    base_date,
    base_time,
    nx,
    ny,
  } = params;

  const url = new URL(
    "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst"
  );

  // 쿼리 파라미터 추가
  url.searchParams.append("serviceKey", decodeURIComponent(serviceKey));
  url.searchParams.append("pageNo", pageNo.toString());
  url.searchParams.append("numOfRows", numOfRows.toString());
  url.searchParams.append("dataType", dataType);
  url.searchParams.append("base_date", base_date);
  url.searchParams.append("base_time", base_time);
  url.searchParams.append("nx", nx);
  url.searchParams.append("ny", ny);

  try {
    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }

    const data: WeatherResponse = await response.json();

    return data.response.body.items.item;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
}

export const weatherRouter = (...args: any[]) => {
  const router = Router();

  return router.get("/", async (req, res) => {
    const { base_date, base_time, nx, ny } = req.query;

    if (!base_date || !base_time || !nx || !ny) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    try {
      const weatherData = await getWeatherData({
        base_date: base_date as string,
        base_time: base_time as string,
        nx: nx as string,
        ny: ny as string,
      });

      res.json(weatherData);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch weather" });
    }
  });
};
