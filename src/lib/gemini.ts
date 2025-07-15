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
              text: `You are an expert learning path designer. Create a comprehensive, well-structured learning roadmap for: "${content}".

              IMPORTANT: Respond ONLY with valid JSON. No markdown formatting, no explanatory text, just the JSON object.

              Structure your response as this exact JSON format:
              {
                "title": "Clear, specific title for the learning path",
                "description": "Compelling 1-2 sentence overview of what learners will achieve",
                "estimatedDuration": "Time estimate (e.g., '3-6 months', '8-12 weeks')",
                "difficultyLevel": "Beginner|Intermediate|Advanced",
                "nodes": [
                  {
                    "title": "Phase/Module name (e.g., 'Fundamentals', 'Core Concepts')",
                    "order": 1,
                    "duration": "Time estimate for this phase",
                    "prerequisite": "What should be known before this phase",
                    "subtopics": [
                      {
                        "title": "Specific skill/concept to learn",
                        "description": "Clear explanation of what this covers and why it's important",
                        "practicalExample": "Real-world application or project idea"
                      }
                    ]
                  }
                ]
              }

              Guidelines:
              - Create any numbers of main nodes representing logical learning phases
              - Each node should have any number of focused subtopics
              - Progress from basic to advanced concepts
              - Include practical, hands-on learning opportunities
              - Make descriptions actionable and specific
              - Ensure smooth progression between phases
              - Focus on industry-relevant skills and real-world applications

              The roadmap should be professional, comprehensive, and follow best learning practices.`,
            },
          ],
        },
      ],
    });

    console.log("Raw Gemini response:", response.text);

    // Clean the response text to extract JSON
    let jsonText = response.text || "{}";

    // Remove any markdown formatting or extra text
    if (jsonText.includes("```json")) {
      jsonText = jsonText.split("```json")[1]?.split("```")[0] || "{}";
    } else if (jsonText.includes("```")) {
      // Handle cases where it might use ``` without json
      const parts = jsonText.split("```");
      if (parts.length >= 3) {
        jsonText = parts[1];
      }
    }

    // Clean up any leading/trailing whitespace and non-JSON text
    jsonText = jsonText.trim();

    // Find the JSON object boundaries
    const startIndex = jsonText.indexOf("{");
    const lastIndex = jsonText.lastIndexOf("}");

    if (startIndex !== -1 && lastIndex !== -1) {
      jsonText = jsonText.substring(startIndex, lastIndex + 1);
    }

    const parsedData = JSON.parse(jsonText);

    // Validate the structure and provide defaults
    return {
      title: parsedData.title || "Learning Roadmap",
      description: parsedData.description || "A comprehensive learning path",
      estimatedDuration: parsedData.estimatedDuration || "Variable",
      difficultyLevel: parsedData.difficultyLevel || "Intermediate",
      nodes: Array.isArray(parsedData.nodes) ? parsedData.nodes : [],
    };
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
}
