"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ToolParent from "./ToolParent.jsx";
import PreviewParent from "./PreviewParent.jsx";
import ToolHeader from "./ToolHeader.jsx";
import styles from "./ToolWrapper.module.css";

export default function ToolWrapper() {
  const searchParams = useSearchParams();

  const [saveData, setSaveData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showPreview, setShowPreview] = useState(false);

  const dataType = searchParams.get("type") || "Full";

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(`/api/getFullDummyData?type=${dataType}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        if (result.success) {
          setSaveData(result.data);
        } else {
          throw new Error(result.error || "Unknown error occurred");
        }
      } catch (err) {
        console.error(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  function togglePreview() {
    setShowPreview((prev) => !prev);
    console.log("Toggled preview");
  }

  const ventureArray = [
    "Select Venture type",
    "Journey 🚶‍♀️",
    "Search ❓",
    "Explore 🗺️",
    "Scavenger Hunt 🔎",
    "Binge drinking 🍻",
  ];

  const imageTypes = [
    // Your imageTypes data here...
  ];

  return (
    <div className="relative w-full h-full overflow-x-clip overflow-y-scroll">
      {isLoading && <div> loading... </div>}
      {!isLoading && (
        <>
          <div className="fixed bottom-0 right-0 flex gap-2">
            <div
              className={`h-8 w-16 text-center flex flex-col justify-center ${
                dataType === "Full" ? "bg-gray-400" : "bg-white"
              }`}
            >
              <a
                href="#/?type=Full"
                onClick={() => (window.location.href = "?type=Full")}
              >
                FULL
              </a>
            </div>
            <div
              className={`h-8 w-16 text-center flex flex-col justify-center ${
                dataType === "Half" ? "bg-gray-400" : "bg-white"
              }`}
            >
              <a
                href="#/?type=Half"
                onClick={() => (window.location.href = "?type=Half")}
              >
                HALF
              </a>
            </div>
            <div
              className={`h-8 w-16 text-center flex flex-col justify-center ${
                dataType === "Empty" ? "bg-gray-400" : "bg-white"
              }`}
            >
              <a
                href="#/?type=Empty"
                onClick={() => (window.location.href = "?type=Empty")}
              >
                EMPTY
              </a>
            </div>
          </div>
          <ToolHeader togglePreview={togglePreview} showPreview={showPreview} />
          <div className="absolute w-full h-full top-[80px] left-0">
            <ToolParent
              ventureArray={ventureArray}
              saveData={saveData}
              imageTypes={imageTypes}
            />
          </div>
          <div
            className={`absolute w-full h-full top-[80px] left-0 ${
              !showPreview ? styles.popOut : styles.popOver
            }`}
          >
            <PreviewParent saveData={saveData} ventureArray={ventureArray} />
          </div>
        </>
      )}
    </div>
  );
}
