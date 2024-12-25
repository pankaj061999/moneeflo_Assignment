"use client";

import StepFirstComponent from "@/Components/Home/Steps/steps1";
import StepSecondComponent from "@/Components/Home/Steps/steps2";
import StepThirdComponent from "@/Components/Home/Steps/steps3";
import StepFourthComponent from "@/Components/Home/Steps/steps4";
import { RootState } from "@/redux/reducers";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1);

  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  const router = useRouter();

  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const tabs = ["First", "Second"];

  const handleNextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePreviousStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    const isSuccess = Math.random() > 0.5;
    setStatusMessage(
      isSuccess
        ? "Form submission successful!"
        : "Form submission failed. Please try again."
    );
  };

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar */}
      <div className="w-full md:w-1/5 bg-gray-800 p-4 border-r border-gray-300 md:fixed md:h-full">
        <h2 className="text-lg font-semibold mb-4 text-center text-white">
          Tabs
        </h2>
        <ul className="space-y-2">
          {tabs.map((tab) => (
            <li
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`p-3 text-center cursor-pointer rounded ${
                activeTab === tab
                  ? "bg-blue-500 text-white"
                  : "hover:bg-blue-100 text-gray-300"
              }`}
            >
              {tab}
            </li>
          ))}
        </ul>
        <button
          className="w-full mt-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => {
            setIsModalOpen(true);
            setStatusMessage(null);
          }}
        >
          Settings
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-grow p-4 md:ml-1/5">
        <h1 className="text-2xl font-semibold mb-4">{activeTab} Content</h1>
        <p className="text-gray-600">Content for the {activeTab} tab goes here.</p>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center text-cyan-500">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/3">
            <h2 className="text-xl font-semibold mb-4">Step {step} of 4</h2>
            <div className="w-full bg-gray-200 h-2 rounded mb-4">
              <div
                className={`h-full bg-blue-500 rounded transition-all`}
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
            {step === 1 && <StepFirstComponent onNext={handleNextStep} />}
            {step === 2 && <StepSecondComponent />}
            {step === 3 && <StepThirdComponent />}
            {step === 4 && <StepFourthComponent />}
            <div className="mt-4 flex justify-between">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                disabled={step === 1}
                onClick={handlePreviousStep}
              >
                Previous
              </button>
              <button
                className={`px-4 py-2 ${
                  step === 4
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-blue-500 hover:bg-blue-600"
                } text-white rounded`}
                onClick={step === 4 ? handleSubmit : handleNextStep}
              >
                {step === 4 ? "Submit" : "Next"}
              </button>
            </div>
            {statusMessage && (
              <div
                className={`mt-4 p-4 rounded ${
                  statusMessage.includes("successful")
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {statusMessage}
              </div>
            )}
            <button
              className="mt-4 w-full py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Dashboard;
