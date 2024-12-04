"use client";
import { useState, useEffect } from "react";

import RadioButton from "./toolComps/RadioButton";
import VentureDropDown from "./toolComps/VentureDropdown";
import ConditionalExpandable from "./toolComps/conditionalExpandable";
import VentureTitle from "./toolComps/VentureTitle";
import SelectImage from "./toolComps/SelectImage";
import SelectImageModal from "./toolComps/SelectImageModal";

export default function ToolParent({ ventureArray, saveData, imageTypes }) {
  const [selectedPlayers, setSelectedPlayers] = useState(0);
  const [selectedVenture, setSelectedVenture] = useState(0);
  const [ventureTitle, setVentureTitle] = useState(false);
  const [selectedImage, setSelectedImage] = useState(false);
  const [showImageModal, setShowImageModal] = useState(true);

  //WRITE SAVEDATA
  const [localSaveData, setLocalSaveData] = useState({
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

  //STAGE CONTROLLER
  //console.log("SAVEDATA:" + "\n" + JSON.stringify(saveData));
  const [stageOneComplete, setStageOneComplete] = useState(false);
  const [stageTwoComplete, setStageTwoComplete] = useState(false);
  const [stageThreeComplete, setStageThreeComplete] = useState(false);

  useEffect(() => {
    if (saveData) {
      setLocalSaveData(saveData);
      console.log("Set local save data: \n" + JSON.stringify(localSaveData));
    } else {
      console.log("no saveData found");
    }

    if (localSaveData.players && localSaveData.type) {
      setStageOneComplete(true);
      console.log("Completed stage 1");

      setSelectedPlayers(localSaveData.players);
      setSelectedVenture(localSaveData.type);
    } else if (stageOneComplete && localSaveData.title && localSaveData.image) {
      setStageTwoComplete(true);
      console.log("Completed stage 2");
    } else if (stageTwoComplete && localSaveData.desc && localSaveData.time) {
      setStageThreeComplete(true);
      console.log("Completed stage 3");
    } else {
      setStageOneComplete(false);
      setStageTwoComplete(false);
      setStageThreeComplete(false);
    }
  }, [localSaveData]);

  function selectRadio(selection) {
    setSelectedPlayers(selection);
    console.log("selected " + selection);
  }

  return (
    <div>
      {/* SELECT IMAGE MODAL */}
      <div className="relative">
        <SelectImageModal
          showImageModal={showImageModal}
          setShowImageModal={setShowImageModal}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          imageTypes={imageTypes}
        />
      </div>
      <div className="bg-svBg w-[393px] h-[772px] p-[14px]">
        {/* SELECT PLAYERS */}
        <div className="w-full flex flex-col ">
          <h2 className="text-center ">Players</h2>
          <p className="text-center mb-[20px]">
            How many players is this venture meant for?
          </p>
          <div className="flex w-full justify-evenly">
            <RadioButton
              players={1}
              selectedPlayers={selectedPlayers}
              selectRadio={selectRadio}
            />
            <RadioButton
              players={2}
              selectedPlayers={selectedPlayers}
              selectRadio={selectRadio}
            />
            <RadioButton
              players={3}
              selectedPlayers={selectedPlayers}
              selectRadio={selectRadio}
            />
          </div>
        </div>
        {/* SELECT VENTURE TYPE */}
        <div className="w-full flex flex-col mt-[40px]">
          <h2 className="text-center ">Venture Type</h2>
          <p className="text-center mb-[20px]">What kind of Venture is it?</p>
          <VentureDropDown
            ventureArray={ventureArray}
            selectedVenture={selectedVenture}
            setSelectedVenture={setSelectedVenture}
          />
        </div>
        {/* STAGE 2 */}
        <ConditionalExpandable condition={stageOneComplete}>
          <VentureTitle
            ventureTitle={ventureTitle}
            setVentureTitle={setVentureTitle}
          />
          <SelectImage
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />
        </ConditionalExpandable>
      </div>
    </div>
  );
}
