"use client";
import { useEffect, useState } from "react";
import ToolParent from "./ToolParent.jsx";
import PreviewParent from "./PreviewParent.jsx";
import ToolHeader from "./ToolHeader.jsx";
import styles from "./ToolWrapper.module.css";

export default function ToolWrapper() {
  const [saveData, setSaveData] = useState({
    id: null,
    players: null,
    type: null,
    title: null,
    image: null,
    imageX: null,
    imageY: null,
    desc: null,
    time: null,
    tasks: [],
  });
  const [savedVentures, setSavedVentures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [showPreview, setShowPreview] = useState(false);
  const [previewData, setPreviewData] = useState({
    players: null,
    type: null,
    title: null,
    image: null,
    imageX: null,
    imageY: null,
    desc: null,
    time: null,
    tasks: [],
  });

  const [newSaveData, setNewSaveData] = useState({
    id: null,
    players: null,
    type: null,
    title: null,
    image: null,
    imageX: null,
    imageY: null,
    desc: null,
    time: null,
    tasks: [],
  });

  //const dataType = searchParams.get("type") || "Full";

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(`/api/getAllVentures`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const { data } = await response.json();
        if (data) {
          console.log(data);
          setSavedVentures(data);
        } else {
          throw new Error("No data received");
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

  function handleSaveData(id) {
    const selectedVenture = savedVentures.find((venture) => venture.id === id);
    if (selectedVenture) {
      setSaveData(selectedVenture);
      console.log("SET SAVEDATA TO: \n" + JSON.stringify(selectedVenture));
    }
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

  async function saveVenture(data) {
    try {
      console.log("Sending data:", data); // Debug log

      const response = await fetch("/api/saveVenture", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: data.id,
          data: {
            ...data,
            tasks: data.tasks, // This will be stringified in the route handler
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Response not OK:", errorData); // Debug log
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Save successful:", result);
      return result;
    } catch (error) {
      console.error("Error saving venture:", error);
      throw error;
    }
  }

  return (
    <div className="relative w-full h-full overflow-x-clip overflow-y-scroll">
      {isLoading && <div> loading... </div>}
      {!isLoading && (
        <>
          {/* <div className="fixed bottom-0 right-0 flex gap-2">
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
          </div> */}
          <div className="fixed bottom-0 right-0 flex flex-col gap-4 bg-white">
            {savedVentures.map((venture, index) => (
              <div
                key={index}
                className="flex gap-4"
                onClick={() => {
                  handleSaveData(venture.id);
                }}
              >
                <h2>ID: {venture.id}</h2>
                <h3>Title: {venture.title ?? "No title yet"}</h3>
              </div>
            ))}
          </div>
          <div
            className="fixed top-0 right-0 flex flex-col justify-center text-center p-4 rounded-lg bg-darkerOrange"
            onClick={() => {
              saveVenture(newSaveData);
            }}
          >
            <h2>SAVE VENTURE</h2>
          </div>
          <ToolHeader togglePreview={togglePreview} showPreview={showPreview} />
          <div className="absolute w-full h-full top-[80px] left-0">
            <ToolParent
              ventureArray={ventureArray}
              saveData={saveData}
              imageTypes={imageTypes}
              previewData={previewData}
              setPreviewData={setPreviewData}
              setNewSaveData={setNewSaveData}
            />
          </div>
          <div
            className={`absolute w-full h-full top-[80px] left-0 ${
              !showPreview ? styles.popOut : styles.popOver
            }`}
          >
            <PreviewParent
              saveData={saveData}
              ventureArray={ventureArray}
              previewData={previewData}
            />
          </div>
        </>
      )}
    </div>
  );
}
