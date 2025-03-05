import React, { useState } from "react";
import Button from "../ui/Button";
import CSVUpload from "../ui/CSVUpload";
import ImageUpload from "../ui/ImageUpload";
import Textarea from "../ui/Textarea";
import Card from "../ui/Card";
import CardContent from "../ui/CardContent";
import Modal from "../ui/Modal";
import SummaryChart from "../ui/SummaryChart";
import { generateResponses } from "../utils/api";
// import "./PilotStudySim.css";

const PilotStudySim = () => {
  const [responses, setResponses] = useState([]);
  const [apiKey, setApiKey] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [csvData, setCsvData] = useState([]);
  const [image, setImage] = useState(null);
  const [summary, setSummary] = useState({ adopt: 0, notInterested: 0 });
  const [productConcept, setProductConcept] = useState("");

  const handleGenerateResponses = async () => {
    const summary = await generateResponses(csvData, productConcept, image, apiKey);
    setSummary(summary);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Pilot Study Simulator</h1>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(key) => setApiKey(key)}
      />
      <div className="mb-8"></div>
      <Card>
        <CardContent>
          <Textarea value={productConcept} onChange={(e) => setProductConcept(e.target.value)} placeholder="Describe your product"/>
          <CSVUpload onFileUpload={setCsvData} />
          <ImageUpload onImageUpload={setImage} />
          <Button onClick={handleGenerateResponses}>Simulate User Feedback</Button>
        </CardContent>
      </Card>
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Summary Statistics</h2>
        <SummaryChart summary={summary} />
      </div>
    </div>
  );
};

export default PilotStudySim;