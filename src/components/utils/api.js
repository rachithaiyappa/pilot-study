import axios from "axios";

export const generateResponses = async (csvData, productConcept, image, apiKey) => {
  const totalQueries = csvData.length;
  if (!window.confirm(`This will make ${totalQueries} queries to the LLM. Do you want to proceed?`)) {
    return;
  }

  let adoptCount = 0;
  let notInterestedCount = 0;

  for (const user of csvData) {
    const prompt = `Simulate feedback about a product concept from an individual with the following demographics: Age: ${user.age}, Education Level: ${user["education level"]}. Will this user adopt the product? Provide a response in JSON format:{
              "decision": "adopt" | "not_interested",
            }
            
            Product Concept: ${productConcept}`;

    try {
      const res = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o-mini",
          messages: [
            { role: "user", content: prompt },
            {role: "user",
              content: [
                { 
                  type: "text", text: prompt 
                },
                {
                  type: "image_url", 
                  "image_url": 
                  {
                    "url": image 
                  }
                }
              ]
            },
          ],
          max_tokens: 100,
          "response_format": {
              "type": "json_schema",
              "json_schema": {
                  "name": "adoption_response",
                  "strict": true,
                  "schema": {
                      "type": "object",
                      "properties": {
                          "decision": {
                              "type": "string",
                              enum: ["adopt", "not_interested"]
                              }
                          },
                          "required": ["decision"],
                          "additionalProperties": false
                      }
                  }
              }
        },
        {
          headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" }
        }
      );

      const feedback = res.data.choices[0].message.content;
      const parsedFeedback = JSON.parse(feedback);
      if (parsedFeedback.decision === "adopt") {
        adoptCount++;
      } else {
        notInterestedCount++;
      }
    } catch (error) {
      console.error("Error generating response:", error.response?.data || error.message);
    }
  }

  return {
    adopt: (adoptCount / totalQueries) * 100,
    notInterested: (notInterestedCount / totalQueries) * 100,
  };
};