import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: import.meta.env.VITE_DEEP_SEEK_API_KEY,
});

export async function analyzeImageWithDeepseek(base64Image) {
  try {
    const response = await openai.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content:
            "You are a hazard and risk detection expert. When given an image, describe the risks, hazards, dangerous objects, and any potential safety concerns seen in the image.",
        },
        {
          role: "user",
          content: [
            { type: "text", content: "Please analyze this image for risks." },
            {
              type: "image_url",
              image_url: `data:image/jpeg;base64,${base64Image}`,
            },
          ],
        },
      ],
    });

    const result = response.choices[0].message.content;
    console.log("DeepSeek analysis:", result);
    return result;
  } catch (error) {
    console.error("DeepSeek image analysis failed:", error);
    return { error: error.message };
  }
}

export async function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = reject;
  });
}
