import { useState, useEffect } from "react";

export default function SelectImageModal({
  showImageModal,
  setShowImageModal,
  selectedImage,
  setSelectedImage,
  imageTypes,
}) {
  return (
    <div
      className={`z-40 bg-[rgba(35,0,35,0.2)] w-[393px] h-[852px] fixed top-0 left-[763px] backdrop-blur-sm flex flex-col justify-center p-[14px] ${
        showImageModal ? "" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className={`w-full h-[200px] bg-svBg mx-auto`}>
        <div className="h-[38px] min-w-full overflow-x-scroll flex">
          {imageTypes.map((type, index) => (
            <div
              key={index}
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
      </div>
    </div>
  );
}
