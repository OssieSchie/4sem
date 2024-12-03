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
          <h3 className="text-center ml-4">{selectedVenture}</h3>
        </div>
        <div className="min-w-[38px] h-full rounded-md bg-primaryTeal flex rotate-[0deg]">
          <div className="h-[22px] w-[28px] my-auto mx-auto overflow-clip relative rounded-sm ">
            <img
              src="./icons/whiteArrow.svg"
              alt="white arrow"
              className="w-[37px] h-[26px]"
            />
          </div>
        </div>
      </div>
      <div
        className={`absolute top-[38px] w-[365px] ${
          !isExpanded ? styles.collapsed : styles.expanded
        }`}
      >
        {ventureArray.map((venture, index) => (
          <div
            key={index}
            onClick={() => {
              setSelectedVenture(venture);
              setIsExpanded((prev) => !prev);
            }}
          >
            <p className="text-center my-2 ">{venture}</p>
            <div className="w-3/4 h-[2px] mx-auto bg-darkerOrange" />
          </div>
        ))}
      </div>
    </div>
  );
}
