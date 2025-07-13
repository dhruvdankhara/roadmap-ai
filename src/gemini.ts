import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

const ai = new GoogleGenAI({
  apiKey: apiKey,
});

export async function callGeminiAPI(
  content: string,
  model = "gemini-2.5-flash"
) {
  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: [
        {
          parts: [
            {
              text: `Create a detailed learning roadmap for: "${content}". 
              
              Please structure the response as a JSON object with the following format:
              {
                "title": "Main topic name",
                "description": "Brief description of the roadmap",
                "nodes": [
                  {
                    "title": "Main topic/step",
                    "subtopics": [
                      {
                        "title": "Subtopic name",
                        "description": "Detailed description of this subtopic"
                      }
                    ]
                  }
                ]
              }
              
              Make sure to include 4-6 main nodes with 2-4 subtopics each. Focus on practical, actionable learning steps.`,
            },
          ],
        },
      ],
    });

    console.log(response.text);

    return JSON.parse(
      response.text?.split("```json")[1]?.split("```")[0] || "{}"
    );
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
}
