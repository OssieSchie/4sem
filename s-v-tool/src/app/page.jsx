"use client";
import { useState, useEffect } from "react";
import "./layout.jsx";

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
    "times",
    "cursive",
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
        <div className="bg-primaryTeal w-full h-full hover:h-28 transition-all"></div>
        <div className="bg-darkerTeal w-full h-full hover:h-28 transition-all"></div>
        <div className="bg-orangeTeal w-full h-full hover:h-28 transition-all"></div>
        <div className="bg-darkerOrange w-full h-full hover:h-28 transition-all"></div>
        <div className="bg-svBg w-full h-full hover:h-28 transition-all"></div>
        <div className="bg-svText w-full h-full hover:h-28 transition-all"></div>
        <div className="bg-iconGray w-full h-full hover:h-28 transition-all"></div>
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
