import type { MongoDB } from "../mongodb";
import { stringToObjectId } from "../mongodb";
import { Router } from "express";
import { createClient } from "redis";
import { rateLimit } from "express-rate-limit";
import { RedisStore } from "rate-limit-redis";

export type Language = "ko" | "en" | "ja" | "zh" | "auto";

const PAPAGO_LANGUAGE_MAP: Record<Exclude<Language, "auto">, string> = {
  ko: "ko",
  en: "en",
  ja: "ja",
  zh: "zh-CN",
};

// Redis client setup
const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

// Handle Redis connection
(async () => {
  redisClient.on("error", (err) => console.error("Redis Client Error:", err));
  await redisClient.connect();
})();

// Papago API를 호출하여 번역된 텍스트를 반환
export async function getPapagoTranslation(
  text: string,
  targetLang: Exclude<Language, "auto">
) {
  const cacheKey = `translation:${targetLang}:${text}`;

  // Try to get from cache first
  const cachedResult = await redisClient.get(cacheKey);
  if (cachedResult) {
    return JSON.parse(cachedResult.toString());
  }

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
  const translatedText = data.message.result.translatedText;

  // Cache the result (expire after 1 day)
  await redisClient.set(cacheKey, JSON.stringify(translatedText), {
    EX: 60 * 60 * 24,
  });

  return translatedText;
}

export const papagoTranslationRouter = (...args: any[]) => {
  const router = Router();

  // // Rate limiting middleware (100 requests per hour per IP)
  // const limiter = rateLimit({
  //   windowMs: 60 * 60 * 1000, // 1 hour
  //   max: 100, // limit each IP to 100 requests per windowMs
  //   standardHeaders: true,
  //   legacyHeaders: false,
  //   store: new RedisStore({
  //     sendCommand: (...args: any[]) => redisClient.sendCommand(args),
  //   }),
  //   message: { error: "Too many translation requests, please try again later" },
  // });

  // Apply rate limiter to translation endpoint
  router.post("/translate", async (req, res) => {
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

  return router;
};

// Graceful shutdown to close Redis connection
process.on("SIGINT", async () => {
  await redisClient.quit();
  process.exit(0);
});
