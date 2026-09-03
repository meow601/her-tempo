import express from "express";
import cors from "cors";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// API health endpoint
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", app: "Cycle Tracker" });
});

// Gemini AI Cycle Guidance & Insights
app.post("/api/ai/cycle-insights", async (req, res) => {
  try {
    const { currentPhase, dayOfCycle, symptoms, moods, bbt } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // Return helpful deterministic fallback if no API key is set
      return res.json({
        phaseInsight: `During your ${currentPhase || "current"} phase, focus on nourishing warm meals, steady hydration, and gentle movement.`,
        nutritionTip: "Incorporate magnesium-rich foods like dark leafy greens, pumpkin seeds, and avocado.",
        movementSuggestion: "Consider yin yoga or a 20-minute restorative walk in nature.",
        energyOutlook: "Energy naturally balances out; listen closely to your body's signals."
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    const prompt = `You are a supportive, knowledgeable women's health and holistic wellness expert for the "Cycle Tracker" application.
The user is currently at:
- Cycle Phase: ${currentPhase || "Follicular"}
- Cycle Day: Day ${dayOfCycle || 12}
- Logged Symptoms: ${(symptoms || []).join(", ") || "None specified"}
- Logged Moods: ${(moods || []).join(", ") || "Calm, Balanced"}
- BBT: ${bbt ? `${bbt}°` : "Not logged"}

Please return a JSON object with:
1. "phaseInsight": A warm, encouraging 2-sentence explanation of what is happening hormonally and mentally in this phase.
2. "nutritionTip": A specific holistic nutritional suggestion for this phase.
3. "movementSuggestion": A recommended exercise or movement practice aligned with this phase's energy.
4. "energyOutlook": A brief expectation for energy and mood today.

Return ONLY valid JSON matching this schema without markdown codeblocks if possible.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const resultText = response.text || "{}";
    const parsed = JSON.parse(resultText);
    return res.json(parsed);
  } catch (error: any) {
    console.error("Gemini insight error:", error);
    return res.status(500).json({
      error: "Failed to generate AI insights",
      phaseInsight: "Your hormones are gently shifting today. Prioritize rest, hydration, and mindful nourishment.",
      nutritionTip: "Enjoy warm herbal teas like ginger and chamomile.",
      movementSuggestion: "Gentle pelvic stretching and diaphragmatic breathing.",
      energyOutlook: "Moderate energy level. Take things at a peaceful pace."
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Cycle Tracker server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
