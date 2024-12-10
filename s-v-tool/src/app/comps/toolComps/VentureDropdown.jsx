import { useState } from "react";
import styles from "./VentureDropdown.module.css";

export default function VentureDropDown({
  ventureArray,
  selectedVenture,
  setSelectedVenture,
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className=" w-full flex flex-col mx-auto relative">
      <div
        className="flex w-[310px] h-[38px] gap-[5px] mx-auto"
        onClick={() => {
          setIsExpanded((prev) => !prev);
        }}
      >
        <div className="w-full h-full rounded-md bg-darkerOrange flex justify-center">
          <h3 className="text-center ml-4">{ventureArray[selectedVenture]}</h3>
        </div>
        <div
          className={`min-w-[38px] h-full rounded-md bg-primaryTeal flex transition-colors ${
            !isExpanded
              ? "bg-primaryTeal"
              : "bg-svBg border-2 border-primaryTeal"
          }`}
        >
          <div className="h-[27px] w-[30px] my-auto mx-auto relative rounded-sm flex justify-center">
            {!isExpanded && (
              <img
                src="./icons/whiteArrow.svg"
                alt="white arrow"
                className="w-[30px] h-[27px]"
              />
            )}
            {isExpanded && (
              <img
                src="./icons/whiteArrowOutline.svg"
                alt="white arrow outline"
                className="w-[30px] h-[27px]"
              />
            )}
          </div>
        </div>
      </div>
      <div
        className={`absolute top-[38px] w-[365px] overflow-clip ${
          !isExpanded ? styles.collapsed : ""
        }`}
      >
        <div
          className={`${
            !isExpanded ? styles.translateCollapsed : styles.translateExpand
          }`}
        >
          {ventureArray.map((venture, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedVenture(index);
                setIsExpanded((prev) => !prev);
              }}
              className="bg-svBg"
            >
              <p className="text-center py-2 ">{venture}</p>
              <div className="w-3/4 h-[2px] mx-auto bg-darkerOrange" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
