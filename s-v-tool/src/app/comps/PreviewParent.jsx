"use client";
import PlayersIcon from "./dynamicIcons/PlayersIcon";
import VentureLabel from "./dynamicIcons/VentureLabel";

export default function PreviewParent({ saveData, ventureArray, previewData }) {
  return (
    <div className="flex flex-col bg-svBg h-full z-50">
      <div className="w-full">
        <div className="w-full h-[293px] overflow-clip relative">
          <div className="absolute w-full h-full top-0 left-0 cardGradient z-10"></div>
          <div className="absolute w-full h-full top-0 left-0 z-20 flex flex-col-reverse p-2">
            <div className="w-full flex justify-between mt-auto">
              {previewData?.players && (
                <PlayersIcon players={previewData?.players} />
              )}
              {previewData?.type && (
                <VentureLabel
                  ventureType={previewData.type}
                  ventureArray={ventureArray}
                />
              )}
            </div>
          </div>
          <img
            src={`${previewData?.image || "./icons/missingImage.svg"}`}
            alt="Venture Image here :D"
            style={{
              transform: `translate(${previewData?.imageX || 0}px, ${
                previewData?.imageY || -260
              }px)`,
            }}
            className="min-w-full min-h-full"
          />
        </div>
        <h2 className="text-center mt-2">
          {previewData?.title || "--Venture title--"}
        </h2>
        <h3 className="text-center mt-6">Description</h3>
        <div className="mx-[14px] text-center">
          <p>{previewData?.desc || "Exciting veture description here"}</p>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="h-[2px] w-full bg-darkerTeal my-auto" />
          <h3 className="text-center">
            + {previewData?.tasks?.length || "0"} tasks
          </h3>
          <div className="h-[2px] w-full bg-darkerTeal my-auto" />
        </div>
      </div>
    </div>
  );
}
