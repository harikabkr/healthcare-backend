import { useState, useEffect } from 'react';
import { AutoTokenizer } from '@tensorflow-models/gpt-2';
import { readFileSync, writeFileSync } from 'fs';


export const preprocessMedicalData = async () => {
  const [preprocessedData, setPreprocessedData] = useState(null);

  useEffect(() => {
    const preprocessData = async () => {
      // Load the pre-trained tokenizer
      const tokenizer = await AutoTokenizer.fromPretrained('davinci-3.5-turbo');

      // Load the medical data from a JSON file
      const jsonData = readFileSync('./medical_data.json', 'utf8');
      const data = JSON.parse(jsonData);

      // Extract the medical diagnosis data
      const diagnosisData = data.filter(entry => entry.type === 'diagnosis');
      const inputs = diagnosisData.map(entry => entry.symptoms); // , entry.age , entry.gender
      const outputs = diagnosisData.map(entry => entry.diagnosis); // , entry.treatment, entry.doctor_notes

      // Encode the inputs and outputs using the tokenizer
      const encodedInputs = inputs.map(input => tokenizer.encode(input));
      const encodedOutputs = outputs.map(output => tokenizer.encode(output));

      // Save the preprocessed data to a JSON file
      writeFileSync('./preprocessed_medical_diagnosis_data.jsonl', JSON.stringify({ inputs: encodedInputs, outputs: encodedOutputs }));

      // Set the preprocessed data state
      setPreprocessedData({ inputs: encodedInputs, outputs: encodedOutputs });
    }

    preprocessData();
  }, []);

  return preprocessedData;
  console.log('>--dataset', preprocessedData)
}
