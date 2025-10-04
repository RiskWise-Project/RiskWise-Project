const axios = require("axios");
const { db } = require("../helper/firebase");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

// Summarize Report Controller (Base64 version)
const summarizeReport = async (req, res) => {
  try {
    const { fileNametoPass, description, userId, summary, address } = req.body;

    if (!fileNametoPass || !description || !userId || !summary || !address) {
      return res.status(400).json({
        error:
          "Image (Base64), description, userId, summary, and address are required",
      });
    }

    // === STEP 2: Build AI analysis prompt ===
    const prompt = `
You are an incident analysis AI. Always return valid JSON in this schema:

{
  "category": "Operational | Environmental | Safety | Security | Structural | Other",
  "likelihood": <number between 1 and 5>,
  "impact": <number between 1 and 5>,
  "score": <likelihood × impact>,
  "severity": "Low | Medium | High | Critical",
  "summary": "<one or two sentence summary add the potential consequences if neglected>"
}

Legend for Likelihood (chance of occurrence):
1 - Rare: very unlikely to happen
2 - Unlikely: may happen occasionally
3 - Possible: could happen sometimes
4 - Likely: expected to happen often
5 - Almost Certain: expected to happen very frequently

Legend for Impact (consequence if it occurs):
1 - Negligible: minimal effect, no injuries or damage
2 - Minor: small inconvenience or minor damage
3 - Moderate: noticeable effect, moderate damage or injury
4 - Major: significant disruption, serious injury or large damage
5 - Critical: catastrophic effect, severe injury, loss of life, or total damage

Based on the following incident data, assign category, likelihood, impact, calculate score (likelihood × impact), assign severity, and write a short summary:

- Caption: ${summary}
- Description: ${description}
`;

    const aiResponse = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const rawOutput = aiResponse.data.choices[0]?.message?.content || "{}";

    let structured;
    try {
      structured = JSON.parse(rawOutput);
    } catch (e) {
      structured = {
        category: "Unknown",
        score: 0,
        severity: "Medium",
        summary: "Parsing failed, fallback values used.",
      };
    }

    // === STEP 3: Build full report object ===
    const uniqueId = uuidv4();

    const reportData = {
      uniqueId,
      userId,
      fileBase64: fileNametoPass,
      caption: summary,
      address,
      description,
      likelihood: structured.likelihood || 1,
      impact: structured.impact || 1,
      category: structured.category,
      score: structured.score,
      severity: structured.severity,
      read: false,
      status: "pending",
      summary: structured.summary,
      status: "Pending",
      read: false,
      createdAt: new Date().toISOString(),
    };
    // === STEP 4: Save in Firebase ===
    const docRef = await db.collection("reports").add(reportData);

    // === STEP 5: Respond back ===
    res.json({ id: docRef.id, ...reportData });
  } catch (error) {
    console.error("Summarization error:", {
      message: error.message,
      response: error.response?.data,
    });
    res.status(500).json({ error: "Failed to analyze and store report" });
  }
};

const getReportsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Check UID from token
    if (req.user.uid !== userId) {
      return res
        .status(403)
        .json({ error: "Forbidden: Cannot access other user's reports" });
    }

    const reportsSnapshot = await db
      .collection("reports")
      .where("userId", "==", userId)
      .orderBy("createdAt", "desc")
      .get();

    const reports = reportsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json({ reports });
  } catch (error) {
    console.error("Fetch reports error:", error);
    res.status(500).json({ error: "Failed to fetch reports" });
  }
};

const markReportRead = async (req, res) => {
  try {
    const { reportId } = req.params;

    await db.collection("reports").doc(reportId).update({
      read: true,
    });

    res.json({ success: true });
  } catch (error) {
    console.error("Mark as read error:", error);
    res.status(500).json({ error: "Failed to mark report as read" });
  }
};

module.exports = { summarizeReport, getReportsByUser, markReportRead };
