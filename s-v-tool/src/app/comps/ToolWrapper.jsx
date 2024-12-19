"use client";
import { useEffect, useState } from "react";
import ToolParent from "./ToolParent.jsx";
import PreviewParent from "./PreviewParent.jsx";
import ToolHeader from "./ToolHeader.jsx";
import styles from "./ToolWrapper.module.css";
import toast, { Toaster } from "react-hot-toast";

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
  const [isSaving, setIsSaving] = useState(false);
  const [storedId, setStoredId] = useState("");

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

  useEffect(() => {
    fetchData();
  }, []);

  function bridgeSaveData() {
    const ventureId = storedId ?? null;
    fetchData();
    toast("Venture Saved!");
    handleSaveData(ventureId);
    setIsSaving(false);
  }

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
    "Pub Crawl 🍻",
  ];

  const imageTypes = [
    {
      title: "Nature",
      images: [
        "https://www.wbcsd.org/wp-content/uploads/2023/10/Accelerating-business-along-the-road-to-a-nature-positive-future_i1140.jpg",
        "https://t4.ftcdn.net/jpg/03/81/14/37/360_F_381143721_OCzIVKR1FJp4CzdUbThsmFVm8PsT6UWK.jpg",
        "https://plus.unsplash.com/premium_photo-1673292293042-cafd9c8a3ab3?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bmF0dXJlJTIwaW1hZ2VzfGVufDB8fDB8fHww",
      ],
    },
    {
      title: "Beach",
      images: [
        "https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Beach_at_Fort_Lauderdale.jpg/640px-Beach_at_Fort_Lauderdale.jpg",
        "https://www.thetimes.com/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F46844835-f865-4f0b-87f5-9dc764fdff19.jpg?crop=1564%2C880%2C318%2C0",
      ],
    },
    {
      title: "City",
      images: [
        "https://burst.shopifycdn.com/photos/chicago-city-lights-at-night.jpg?width=1000&format=pjpg&exif=0&iptc=0",
        "https://t4.ftcdn.net/jpg/01/81/07/91/360_F_181079136_irl2A25Clc5Bi2Lwa3Q9kJvF0RlFv8tU.jpg",
        "https://img.freepik.com/free-photo/shiny-night-city_1127-8.jpg?semt=ais_hybrid",
        "https://st.depositphotos.com/1035350/2277/i/450/depositphotos_22772802-stock-photo-tokyo-cityscape.jpg",
      ],
    },
    {
      title: "Space",
      images: [
        "https://cdn.mos.cms.futurecdn.net/AoWXgnHSxAAPxqymPQMQYL-1200-80.jpg",
        "https://cdn.wccftech.com/wp-content/uploads/2016/09/spacee-scaled.jpg",
        "https://i0.wp.com/www.sciencenews.org/wp-content/uploads/2022/11/Hubble-Pillars-of-Creation.jpg?resize=1500%2C1565&ssl=1",
      ],
    },
    {
      title: "Sewers",
      images: [
        "https://th-thumbnailer.cdn-si-edu.com/m8MuEnXtYN25Z8ToUGG984DMqvE=/fit-in/1600x0/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/d5/51/d55123f8-7a20-4906-9578-6513cd606a04/193_t_1920s_construction_of_interceptor_sewers_new_jersey.jpg",
        "https://cleanwater.org/sites/default/files/images/features/Water_National_Drain_feature.jpg",
        "https://cole-mswmag.imgix.net/https%3A%2F%2Fwww.mswmag.com%2Fuploads%2Fimages%2Fparis-sewers_171030_090042.jpg?fit=clip&ixlib=php-1.1.0&q=75&w=1024&s=00d6af931a45e45368421495b5b359a7",
      ],
    },
  ];

  async function saveVenture(data) {
    setIsSaving(true);
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
      bridgeSaveData();
      return result;
    } catch (error) {
      console.error("Error saving venture:", error);
      setIsSaving(false);
      throw error;
    }
  }

  return (
    <div className="relative w-full h-full overflow-x-clip overflow-y-scroll">
      <Toaster />
      {isLoading && <div> loading... </div>}
      {!isLoading && (
        <>
          <div className="fixed bottom-0 right-0 flex flex-col h-[400px] w-[400px] overflow-y-scroll ">
            <h2 className="text-svBg">Click to load a Venture</h2>
            <div className="w-full h-full flex flex-col backdrop-brightness-[1.4]">
              {savedVentures.map((venture, index) => (
                <div
                  key={index}
                  className={`gap-4 py-4 px-2 flex max-w-full ${
                    index % 2 === 0
                      ? "bg-svText50 text-svBg"
                      : "bg-svBg text-svText50"
                  }`}
                  onClick={() => {
                    handleSaveData(venture.id);
                    setStoredId(venture.id);
                  }}
                >
                  <h2 className="w-[20%] truncate">ID: {venture.id}</h2>
                  <h3 className="w-[80%] truncate">
                    Title: {venture.title ?? "No title yet"}
                  </h3>
                </div>
              ))}
            </div>
          </div>
          <div
            className={`fixed bottom-[420px] right-0 flex flex-col justify-center text-center p-4 rounded-lg bg-darkerOrange ${
              isSaving ? "brightness-75" : ""
            }`}
            onClick={() => {
              if (!isSaving) {
                saveVenture(newSaveData);
              } else toast("Saving venture... Please wait.");
            }}
          >
            <h2>{isSaving ? "SAVING..." : "SAVE VENTURE"}</h2>
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
