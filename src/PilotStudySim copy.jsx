import React, { useState } from "react";
import Button from "./components/ui/Button";
import CSVUpload from "./components/ui/CSVUpload";
import Input from "./components/ui/Input";
import Textarea from "./components/ui/Textarea";
import Card from "./components/ui/Card";
import CardContent from "./components/ui/CardContent";
import Modal from "./components/ui/Modal";
import SummaryChart from "./components/ui/SummaryChart";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from "axios";

// Register the necessary components with Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PilotStudySim_text = () => {
  const [responses, setResponses] = useState([]);
  const [apiKey, setApiKey] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [csvData, setCsvData] = useState([]);
  const [summary, setSummary] = useState({ adopt: 0, notInterested: 0 });
  const [productConcept, setProductConcept] = useState(""); // Define productConcept state variable

  const generateResponses = async () => {
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
            model: "gpt-4o",
            messages: [
              { role: "user", content: prompt }
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
    console.log("Feedback Response:", feedback);
    const parsedFeedback = JSON.parse(feedback); // Ensure valid JSON parsing
    console.log("Feedback Decision:", parsedFeedback); // Debugging output
    if (parsedFeedback.decision === "adopt") {
      adoptCount++;
    } else {
      notInterestedCount++;
    }
    // console.log(parsedFeedback); // Debugging output
  } catch (error) {
    console.error("Error generating response:", error.response?.data || error.message);
  }
}

    setSummary({
      adopt: (adoptCount / totalQueries) * 100,
      notInterested: (notInterestedCount / totalQueries) * 100,
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Pilot Study Simulator</h1>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(key) => setApiKey(key)}
      />
      {/* input some vertical space between the modal and the card */}
      <div className="mb-8"></div>
      <Card>
        <CardContent>
          {/* <label className="block font-semibold">Product Concept</label> */}
          <Textarea value={productConcept} onChange={(e) => setProductConcept(e.target.value)} className="mb-3" placeholder="Describe your product"/>
          <CSVUpload onFileUpload={setCsvData} />
          <Button onClick={generateResponses}>Simulate User Feedback</Button>
        </CardContent>
      </Card>
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Summary Statistics</h2>
        <SummaryChart summary={summary} />
      </div>
    </div>
  );
};

export default PilotStudySim_text;