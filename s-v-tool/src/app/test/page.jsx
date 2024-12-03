"use client";
import { useState, useEffect } from "react";
import "../layout.jsx";

export default function svTool() {
  const [fontIndex, setFontIndex] = useState(0);
  const [secondFontIndex, setSecondFontIndex] = useState(1);
  const [colorIndex, setColorIndex] = useState(0);
  const [secondColorIndex, setSecondColorIndex] = useState(1);
  const fontArray = [
    "GeistVF",
    "GeistMono",
    "sansSerif",
    "arial",
    "AmsiPro",
    "Cabin",
  ];

  const colorArray = [
    "primaryTeal",
    "darkerTeal",
    "orangeTeal",
    "darkerOrange",
    "svBg",
    "svText",
    "iconGray",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFontIndex((prev) => (prev + 1) % fontArray.length);
      setSecondFontIndex((prev) => (prev + 1) % fontArray.length);
      setColorIndex((prev) => (prev + 1) % colorArray.length);
      setSecondColorIndex((prev) => (prev + 1) % colorArray.length);
    }, 100);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="h-12 w-full flex">
        <div className="bg-primaryTeal text-[rgba(0,0,0,0)] hover:text-svText text-xs w-full h-full transition-all">
          #00a2ad
        </div>
        <div className="bg-darkerTeal text-[rgba(0,0,0,0)] hover:text-svBg text-xs w-full h-full transition-all">
          #014656
        </div>
        <div className="bg-orangeTeal text-[rgba(0,0,0,0)] hover:text-svText text-xs w-full h-full transition-all">
          #fdd65d
        </div>
        <div className="bg-darkerOrange text-[rgba(0,0,0,0)] hover:text-svText text-xs w-full h-full transition-all">
          #f6a801
        </div>
        <div className="bg-svBg text-[rgba(0,0,0,0)] hover:text-svText text-xs w-full h-full transition-all">
          #f9f7f6
        </div>
        <div className="bg-svText text-[rgba(0,0,0,0)] hover:text-svBg text-xs w-full h-full transition-all">
          #1c1d26
        </div>
        <div className="bg-iconGray text-[rgba(0,0,0,0)] hover:text-svText text-xs w-full h-full transition-all">
          #b6b6b6
        </div>
      </div>

      <div className="w-full h-full flex flex-col justify-center items-center">
        <p>
          <span
            className={`${fontArray[secondFontIndex]} bg-${colorArray[colorIndex]}  text-${colorArray[secondColorIndex]} text-4xl`}
          >
            allo{" "}
          </span>{" "}
          <span
            className={`${fontArray[fontIndex]} bg-${colorArray[secondColorIndex]} text-${colorArray[colorIndex]} text-4xl`}
          >
            mate
          </span>
        </p>
      </div>
    </div>
  );
}
