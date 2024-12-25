"use client"

import React, { useState, useEffect } from "react";

interface UploadedFile {
  file: File;
  id: string;
}

const StepFourthComponent: React.FC = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<string>("Fetching location...");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const selectedFiles = e.target.files;

    if (selectedFiles) {
      const validFiles: UploadedFile[] = [];
      let errorMessage = "";

      Array.from(selectedFiles).forEach((file) => {
        if (file.type === "image/png" || file.type === "application/pdf") {
          if (files.length + validFiles.length < 5) {
            validFiles.push({ file, id: crypto.randomUUID() });
          } else {
            errorMessage = "You can only upload up to 5 files.";
          }
        } else {
          errorMessage = "Invalid file type. Only PNG and PDF files are allowed.";
        }
      });

      setFiles((prev) => [...prev, ...validFiles]);
      if (errorMessage) setError(errorMessage);
      else setError(null);
    }
  };

  const removeFile = (id: string): void => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (files.length === 0) {
      setError("Please upload at least one file.");
      return;
    }
    console.log("Uploaded files:", files);
    alert("Files uploaded successfully!");
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation(`Latitude: ${latitude}, Longitude: ${longitude}`);
      },
      (err) => setLocation("Unable to fetch location."),
      { enableHighAccuracy: true }
    );
  }, []);

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Multi File Upload
        </h2>

        <div className="mb-4">
          <label
            htmlFor="files"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Upload Files (Max: 5; PNG or PDF)
          </label>
          <input
            type="file"
            id="files"
            multiple
            accept=".png, .pdf"
            onChange={handleFileChange}
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        <ul className="mb-4">
          {files.map((f) => (
            <li
              key={f.id}
              className="flex justify-between items-center bg-gray-50 p-2 rounded mb-2"
            >
              <span className="text-sm text-gray-800">{f.file.name}</span>
              <button
                type="button"
                onClick={() => removeFile(f.id)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Geolocation Status
          </label>
          <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
            {location}
          </p>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Upload Files
        </button>
      </form>
    </div>
  );
};

export default StepFourthComponent;
