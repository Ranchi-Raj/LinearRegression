'use client';
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [cgpa, setCgpa] = useState('');
  const [prediction, setPrediction] = useState('');

  const handlePredict = async () => {

    try {
      const response = await axios.post('http://localhost:5000/predict', {
        cgpa: parseFloat(cgpa),
      });
      console.log(response.data);
      setPrediction(`Predicted Package: ${response.data.prediction} LPA`);
    } catch (error) {
      console.error(error);
      setPrediction('Error fetching prediction');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col items-center gap-4">
        <input
          type="number"
          step="0.01"
          value={cgpa}
          onChange={(e) => setCgpa(e.target.value)}
          placeholder="Enter CGPA"
          className="border border-gray-300 rounded-md px-4 py-2 text-center text-lg"
        />
        <button
          onClick={handlePredict}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all"
        >
          Predict Package
        </button>
        {
        prediction && (
          <p className="text-xl font-semibold mt-4">{prediction}</p>
        )
        }
      </div>
    </div>
  );
}
