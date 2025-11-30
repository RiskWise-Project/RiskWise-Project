const axios = require("axios");

const validateReport = async (req, res, next) => {
  try {
    const { summary, description } = req.body;

    if (!summary || !description) {
      return res.status(400).json({
        error: "Caption and description are required for validation",
      });
    }

    const prompt = `
Analyze the user's report.
Return ONLY a JSON object like this:
{"hasIssue": true|false, "reason": "<why>" }

Rules:
- "hasIssue" means the description expresses a real problem, hazard, request for repair, concern, or negative situation.
- Even if matched, if the description contains NO issue (example: "everything is fine", "no problem", "we are happy"), set hasIssue to false.

Caption: ${summary}
Description: ${description}
`;

    // Call AI for validation
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

    // Safely parse AI response
    const aiContent = aiResponse.data.choices?.[0]?.message?.content;
    if (!aiContent) {
      return res.status(500).json({
        error: "AI service returned invalid response",
      });
    }

    let validationResult;
    try {
      validationResult = JSON.parse(aiContent);
    } catch (parseError) {
      return res.status(500).json({
        error: "Failed to parse AI validation response",
        details: parseError.message,
      });
    }

    const { hasIssue, reason } = validationResult;

    if (!hasIssue) {
      return res.status(400).json({
        error: "No real issue detected in the description",
        reason,
      });
    }

    // All good, proceed to summarize
    next();
  } catch (err) {
    console.error("Validation error:", err);
    res.status(500).json({
      error: "Failed to validate caption and description",
      details: err.message,
    });
  }
};

module.exports = validateReport;
