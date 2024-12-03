"use client";
import { useState, useEffect } from "react";
import ToolParent from "./ToolParent.jsx";
import PreviewParent from "./PreviewParent.jsx";

export default function ToolWrapper() {
  const saveData = {
    players: 3,
    type: 3,
    title: "Your Venture title",
    image: "https://i.imgur.com/3cVlvTP.jpeg",
    imageX: 0,
    imageY: -260,
    desc: "Example of a venture description, featuring exciting facts and stories hihihi",
    time: 120,
    tasks: [
      {
        locationAdr: "Slagelsegade 11, 1st th",
        locationGeo: [55.693425, 12.557004],
        desc: "Go over here and jump 28351732c times before doing a cool move",
        image: "https://i.imgur.com/3cVlvTP.jpeg",
      },
      {
        locationAdr: "Mogensvej 47, 2b",
        locationGeo: [55.693425, 12.557004],
        desc: "Find Mogens, han kan ikke gemme sig for evigt",
        image:
          "https://danmarkshistorien.dk/fileadmin/_processed_/5/f/csm_Mogens_Glistrup_ddb3368d5d.jpg",
      },
    ],
  };
  //VVV Null object VVV
  // const saveData = {
  //   players: null,
  //   type: null,
  //   title: null,
  //   image: null,
  //   imageX: null,
  //   imageY: null,
  //   desc: null,
  //   time: null,
  //   tasks: [],
  // };

  const ventureArray = [
    "Journey 🚶‍♀️",
    "Search ❓",
    "Explore 🗺️",
    "Scavenger Hunt 🔎",
    "Binge drinking 🍻",
  ];

  const [showPreview, setShowPreview] = useState(true);

  return (
    <div className="relative w-full h-full">
      <div className="absolute w-full h-full top-0 left-0">
        <ToolParent setShowPreview={setShowPreview} />
      </div>
      <div
        className={`absolute w-full h-full top-0 left-0 ${
          !showPreview ? "hidden" : ""
        }`}
      >
        <PreviewParent
          saveData={saveData}
          ventureArray={ventureArray}
          setShowPreview={setShowPreview}
        />
      </div>
    </div>
  );
}
