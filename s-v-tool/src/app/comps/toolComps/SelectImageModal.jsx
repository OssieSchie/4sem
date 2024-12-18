"use client";
import { useState, useEffect } from "react";

export default function SelectImageModal({
  showImageModal,
  setShowImageModal,
  selectedImage,
  setSelectedImage,
  imageTypes,
}) {
  const [selectedTheme, setSelectedTheme] = useState("Nature");

  function handleThemeSwitch(theme) {
    setSelectedTheme(theme);
    console.log("SET IMAGE THEME TO: \n" + theme);
  }

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full z-40 ${
        showImageModal ? "" : "pointer-events-none"
      }`}
    >
      <div
        className={` bg-[rgba(35,0,35,0.2)] w-[393px] h-[852px] backdrop-blur-sm flex flex-col justify-center p-[14px] mx-auto ${
          showImageModal ? "" : "opacity-0 pointer-events-none h-0"
        }`}
        onClick={() => setShowImageModal(false)}
      >
        <div
          className={`w-full h-[350px] bg-svBg mx-auto`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="h-[38px] min-w-full overflow-x-scroll flex">
            {imageTypes.map((type, index) => (
              <div
                key={index}
                onClick={() => handleThemeSwitch(type.title)}
                className={`h-full flex flex-col justify-center w-auto px-4 ${
                  index % 2 === 0 ? "bg-svBg " : "bg-darkerOrange "
                }`}
              >
                <h2
                  className={`mx-auto ${
                    index % 2 === 0 ? " text-darkerOrange" : " text-svBg"
                  }`}
                >
                  {type.title}
                </h2>
              </div>
            ))}
          </div>
          {/* MAP IMAGES HERE */}
          <div className="grid grid-cols-2 gap-2 p-2 overflow-y-auto h-[calc(100%-38px)]">
            {imageTypes
              .find((type) => type.title === selectedTheme)
              ?.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${selectedTheme} ${index + 1}`}
                  className={`w-[160px] min-w-[160px] h-[160px] min-h-[160px] object-cover ${
                    image === selectedImage
                      ? "border-[3px] border-darkerOrange"
                      : ""
                  }`}
                  onClick={() => setSelectedImage(image)}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
