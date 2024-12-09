"use client";
import { useState, useEffect } from "react";

import RadioButton from "./toolComps/RadioButton";
import VentureDropDown from "./toolComps/VentureDropdown";
import ConditionalExpandable from "./toolComps/conditionalExpandable";
import VentureTitle from "./toolComps/VentureTitle";
import SelectImage from "./toolComps/SelectImage";
import SelectImageModal from "./toolComps/SelectImageModal";
import Description from "./toolComps/Description";

export default function ToolParent({ ventureArray, saveData, imageTypes }) {
  const [selectedPlayers, setSelectedPlayers] = useState(0);
  const [selectedVenture, setSelectedVenture] = useState(0);
  const [ventureTitle, setVentureTitle] = useState(false);
  const [selectedImage, setSelectedImage] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [ventureDescription, setVentureDescription] = useState(false);
  const [selectedTime, setSelectedTime] = useState(false);

  const [updateTrigger, setUpdateTrigger] = useState(false);

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

  useEffect(() => {
    if (saveData && Object.keys(saveData).length > 0) {
      console.log("SAVEDATA \n" + JSON.stringify(saveData));

      const newData = {
        players: saveData.players ?? localSaveData.players,
        type: saveData.type ?? localSaveData.type,
        title: saveData.title ?? localSaveData.title,
        image: saveData.image ?? localSaveData.image,
        desc: saveData.desc ?? localSaveData.desc,
        time: saveData.time ?? localSaveData.time,
        tasks: Array.isArray(saveData.tasks)
          ? saveData.tasks
          : localSaveData.tasks,
      };

      setLocalSaveData(newData);
    }
  }, [saveData]);

  //STAGE CONTROLLER
  const [stageOneComplete, setStageOneComplete] = useState(false);
  const [stageTwoComplete, setStageTwoComplete] = useState(false);
  const [stageThreeComplete, setStageThreeComplete] = useState(false);

  useEffect(() => {
    console.log("Set local save data: \n" + JSON.stringify(localSaveData));

    if (localSaveData.players && localSaveData.type) {
      setStageOneComplete(true);

      setSelectedPlayers(localSaveData.players);
      setSelectedVenture(localSaveData.type);
      console.log(
        "Completed stage 1 \n" +
          "players: " +
          localSaveData.players +
          "\n Type: " +
          localSaveData.type
      );
    }
  }, [localSaveData]);

  useEffect(() => {
    if (stageOneComplete && localSaveData.title && localSaveData.image) {
      setStageTwoComplete(true);
      setVentureTitle(localSaveData.title);
      setSelectedImage(localSaveData.image);
      console.log("Completed stage 2");
    }
  }, [stageOneComplete, updateTrigger]);

  useEffect(() => {
    if (stageTwoComplete && localSaveData.desc && localSaveData.time) {
      setStageThreeComplete(true);
      setVentureDescription(localSaveData.desc);
      setSelectedTime(localSaveData.time);
      console.log("Completed stage 3");
    }
  }, [stageTwoComplete, updateTrigger]);

  // UPDATE LOCALSAVEDATA VALUES FROM STATES
  useEffect(() => {
    setLocalSaveData((prevData) => ({
      ...prevData, // Keep existing values
      players: selectedPlayers, // Update players
      type: selectedVenture, // Update type
      title: ventureTitle, // Update title
      image: selectedImage, // Update image
      desc: ventureDescription, // Update description
      time: selectedTime, // Update time
    }));
  }, [updateTrigger]);

  function selectRadio(selection) {
    setSelectedPlayers(selection);
    setUpdateTrigger((prev) => !prev);
    console.log("selected " + selection);
  }

  return (
    <div>
      {/* TEST DISPLAY OBJECT */}
      <div className="fixed top-0 left-0 bg-svBg flex flex-col gap-2">
        <h3>SAVEDATA</h3>
        <p>FETCHING: </p>
        <p>Players: {saveData?.players || "no data"}</p>
        <p>Type: {saveData?.type || "no data"}</p>
        <p>Title: {saveData?.title || "no data"}</p>
        <div className="h-[100px] w-[100px] overflow-clip">
          <img
            src={`${saveData?.image || "./icons/missingImage.svg"}`}
            alt=" image"
            className="min-w-full min-h-full"
          />
        </div>
        <p>Description: {saveData?.desc || "no data"}</p>
        <p>Time: {saveData?.time || "no data"}</p>
        <p>Tasks: {localSaveData.tasks.length}</p>
      </div>
      <div className="fixed top-0 right-0 bg-svBg flex flex-col gap-2">
        <h3>LOCAL SAVEDATA</h3>
        <p>Players: {localSaveData.players}</p>
        <p>STATE Players: {selectedPlayers}</p>
        <p>Type: {localSaveData.type}</p>
        <p>STATE Type: {selectedVenture}</p>
        <p>Title: {localSaveData.title}</p>
        <p>STATE Title: {ventureTitle}</p>
        <div className="h-[100px] w-[100px] overflow-clip">
          <img
            src={`${localSaveData?.image || "./icons/missingImage.svg"}`}
            alt=" image"
            className="min-w-full min-h-full"
          />
        </div>
        <p>Description: {localSaveData.desc}</p>
        <p>STATE Description: {ventureDescription}</p>
        <p>Time: {localSaveData.time}</p>
        <p>STATE Time: {selectedTime}</p>
        <p>Tasks: {localSaveData.tasks.length}</p>
      </div>
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
      <div className="bg-svBg w-[393px] h-[772px] p-[14px] mb-[40px]">
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
            setUpdateTrigger={setUpdateTrigger}
          />
        </div>
        {/* STAGE 2 */}
        <ConditionalExpandable condition={stageOneComplete}>
          <VentureTitle
            ventureTitle={ventureTitle}
            setVentureTitle={setVentureTitle}
            setUpdateTrigger={setUpdateTrigger}
          />
          <SelectImage
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            setUpdateTrigger={setUpdateTrigger}
          />
        </ConditionalExpandable>
        <ConditionalExpandable condition={stageTwoComplete}>
          <Description
            ventureDescription={ventureDescription}
            setVentureDescription={setVentureDescription}
            setUpdateTrigger={setUpdateTrigger}
          />
        </ConditionalExpandable>
      </div>
    </div>
  );
}
