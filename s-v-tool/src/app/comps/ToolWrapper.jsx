"use client";
import { useState, useEffect } from "react";
import ToolParent from "./ToolParent.jsx";
import PreviewParent from "./PreviewParent.jsx";
import ToolHeader from "./ToolHeader.jsx";
import styles from "./ToolWrapper.module.css";

export default function ToolWrapper() {
  const [saveData, setSaveData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dataRequest, setDataRequest] = useState("Half");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "/api/getFullDummyData?type=" + dataRequest
        ); // Adjust 'Full' to desired type
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
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const ventureArray = [
    "Select Venture type",
    "Journey 🚶‍♀️",
    "Search ❓",
    "Explore 🗺️",
    "Scavenger Hunt 🔎",
    "Binge drinking 🍻",
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

  const [showPreview, setShowPreview] = useState(false);

  function togglePreview() {
    setShowPreview((prev) => !prev);
    console.log("toggled preview");
  }

  return (
    <div className="relative w-full h-full overflow-x-clip overflow-y-scroll">
      <div className="fixed bottom-0 right-0 flex gap-2">
        <div
          className={`h-8 w-16 text-center flex flex-col justify-center ${
            dataRequest === "Full" ? "bg-gray-400" : "bg-white"
          }`}
          onClick={() => {
            setDataRequest("Full");
          }}
        >
          FULL
        </div>
        <div
          className={`h-8 w-16 text-center flex flex-col justify-center ${
            dataRequest === "Half" ? "bg-gray-400" : "bg-white"
          }`}
          onClick={() => {
            setDataRequest("Half");
          }}
        >
          HALF
        </div>
        <div
          className={`h-8 w-16 text-center flex flex-col justify-center ${
            dataRequest === "Empty" ? "bg-gray-400" : "bg-white"
          }`}
          onClick={() => {
            setDataRequest("Empty");
          }}
        >
          EMPTY
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
    </div>
  );
}
