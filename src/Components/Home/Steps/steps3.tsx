"use client"

import React, { useState } from "react";

const StepThirdComponent: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      if (uploadedFile.type === "image/png" || uploadedFile.type === "application/pdf") {
        setFile(uploadedFile);
        setError(null);
      } else {
        setFile(null);
        setError("Invalid file type. Only PNG and PDF files are allowed.");
      }
    }
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (!file) {
      setError("Please upload a valid file before submitting.");
      return;
    }
    console.log("File submitted:", file);
    alert("File uploaded successfully!");
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          File Upload
        </h2>

        {/* File Input */}
        <div className="mb-4">
          <label
            htmlFor="file"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Upload a File (PNG or PDF)
          </label>
          <input
            type="file"
            id="file"
            accept=".png, .pdf"
            onChange={handleFileChange}
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          {file && (
            <p className="text-green-600 text-sm mt-2">
              File selected: {file.name}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Upload File
        </button>
      </form>
    </div>
  );
};

export default StepThirdComponent;
