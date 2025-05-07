import type { MongoDB } from "../mongodb";
import { stringToObjectId } from "../mongodb";
import { Router } from "express";

export type Language = "ko" | "en" | "ja" | "zh" | "auto";

const PAPAGO_LANGUAGE_MAP: Record<Exclude<Language, "auto">, string> = {
  ko: "ko",
  en: "en",
  ja: "ja",
  zh: "zh-CN",
};

// Papago API를 호출하여 번역된 텍스트를 반환
export async function getPapagoTranslation(
  text: string,
  targetLang: Exclude<Language, "auto">
) {
  const PAPAGO_CLIENT_ID = process.env.PAPAGO_CLIENT_ID || "";
  const PAPAGO_CLIENT_SECRET = process.env.PAPAGO_CLIENT_SECRET || "";

  const response = await fetch(
    "https://papago.apigw.ntruss.com/nmt/v1/translation",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "X-NCP-APIGW-API-KEY-ID": PAPAGO_CLIENT_ID,
        "X-NCP-APIGW-API-KEY": PAPAGO_CLIENT_SECRET,
      },
      body: new URLSearchParams({
        source: "ko",
        target: PAPAGO_LANGUAGE_MAP[targetLang],
        text: text,
      }).toString(),
    }
  );

  if (!response.ok) {
    throw new Error(`Papago API error: ${response.status}`);
  }

  const data = await response.json();
  return data.message.result.translatedText;
}

export const papagoTranslationRouter = (...args: any[]) => {
  const router = Router();

  return router.post("/translate", async (req, res) => {
    const { text, targetLang } = req.body;

    if (!text || !targetLang) {
      return res.status(400).json({ error: "Missing text or target language" });
    }

    try {
      const translatedText = await getPapagoTranslation(text, targetLang);
      res.json({ translatedText });
    } catch (error) {
      console.error("Error during translation:", error);
      res.status(500).json({ error: "Failed to translate text" });
    }
  });
};
