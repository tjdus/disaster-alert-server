import type { MongoDB } from "../mongodb";
import { stringToObjectId } from "../mongodb";
import { Router } from "express";

interface DisasterAlertParams {
  serviceKey?: string;
  numOfRows?: number;
  pageNo?: number;
  returnType?: "JSON" | "XML";
  crtDt?: string;
  rgnNm?: string;
}

interface DisasterAlertResponse {
  header: {
    resultCode: string;
    resultMsg: string;
    errorMsg: string | null;
  };
  numOfRows: number;
  pageNo: number;
  totalCount: number;
  body: DisasterAlert[];
}

interface DisasterAlert {
  SN: string;
  CRT_DT: string;
  MSG_CN: string;
  RCPTN_RGN_NM: string;
  EMRG_STEP_NM: string;
  DST_SE_NM: string;
  REG_YMD: string;
  MDFCN_YMD: string;
}

async function getDisasterAlerts(
  params: DisasterAlertParams
): Promise<DisasterAlert[]> {
  const {
    serviceKey = process.env.DISASTER_ALERT_SERVICE_KEY || "",
    numOfRows = 10,
    pageNo = 1,
    returnType = "JSON",
    crtDt,
    rgnNm,
  } = params;

  const url = new URL("https://www.safetydata.go.kr/V2/api/DSSP-IF-00247");
  // Add query parameters
  url.searchParams.append("serviceKey", serviceKey);
  url.searchParams.append("numOfRows", numOfRows.toString());
  url.searchParams.append("pageNo", pageNo.toString());
  url.searchParams.append("returnType", returnType);

  if (crtDt) url.searchParams.append("crtDt", crtDt);
  if (rgnNm && rgnNm !== "전국") url.searchParams.append("rgnNm", rgnNm);

  try {
    const response = await fetch(url.toString());
    if (!response.ok) {
      const errorText = await response.text();
      console.error("API error details:", errorText);
      throw new Error(`Disaster Alert API error: ${response.status}`);
    }

    const data: DisasterAlertResponse = await response.json();
    if (data.header.resultCode !== "00") {
      throw new Error(
        `API error: ${data.header.resultMsg} (${data.header.resultCode})`
      );
    }

    return data.body;
  } catch (error) {
    console.error("Failed to fetch disaster alerts:", error);
    throw error;
  }
}

export const disasterAlertRouter = (...args: any[]) => {
  const router = Router();

  return router.get("/", async (req, res) => {
    const { date, region } = req.query;

    try {
      const params: DisasterAlertParams = {
        crtDt: date as string,
        rgnNm: region as string,
      };
      const disasterAlerts = await getDisasterAlerts(params);
      res.json(disasterAlerts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch disaster alerts" });
    }
  });
};
