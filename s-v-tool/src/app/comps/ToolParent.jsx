"use client";
import { useState, useEffect } from "react";

import RadioButton from "./toolComps/RadioButton";
import VentureDropDown from "./toolComps/VentureDropdown";
import ConditionalExpandable from "./toolComps/conditionalExpandable";
import VentureTitle from "./toolComps/VentureTitle";
import SelectImage from "./toolComps/SelectImage";
import SelectImageModal from "./toolComps/SelectImageModal";
import Description from "./toolComps/Description";
import Time from "./toolComps/Time";

export default function ToolParent({
  ventureArray,
  saveData,
  imageTypes,
  previewData,
  setPreviewData,
}) {
  const [selectedPlayers, setSelectedPlayers] = useState(0);
  const [selectedVenture, setSelectedVenture] = useState(0);
  const [ventureTitle, setVentureTitle] = useState(false);
  const [selectedImage, setSelectedImage] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [ventureDescription, setVentureDescription] = useState(false);
  const [selectedTime, setSelectedTime] = useState(false);

  //READ SAVEDATA
  useEffect(() => {
    console.log("SAVEDATA \n" + JSON.stringify(saveData));

    setSelectedPlayers(saveData.players ?? null);
    setSelectedVenture(saveData.type ?? null);
    setVentureTitle(saveData.title ?? null);
    setSelectedImage(saveData.image ?? null);
    setVentureDescription(saveData.desc ?? null);
    setSelectedTime(saveData.time ?? null);
  }, [saveData]);

  //STAGE CONTROLLER
  const [stageOneComplete, setStageOneComplete] = useState(false);
  const [stageTwoComplete, setStageTwoComplete] = useState(false);
  const [stageThreeComplete, setStageThreeComplete] = useState(false);

  function checkStageProgress() {
    console.log(
      "STATES: \n SELECTEDPLAYERS: " +
        selectedPlayers +
        "\n SELECTEDVENTURE: " +
        selectedVenture +
        "\n VENTURE TITLE: " +
        ventureTitle +
        "\n SELECTEDIMAGE: " +
        selectedImage +
        "\n VENTURE DESCRIPTION: " +
        ventureDescription +
        "\n SELECTED TIME: " +
        selectedTime
    );

    if (
      selectedPlayers &&
      selectedVenture &&
      !ventureTitle &&
      !selectedImage &&
      !ventureDescription &&
      !selectedTime
    ) {
      setStageOneComplete(true);
      console.log("Stage 1 complete");
    } else if (
      selectedPlayers &&
      selectedVenture &&
      ventureTitle &&
      selectedImage &&
      !ventureDescription &&
      !selectedTime
    ) {
      setStageOneComplete(true);
      setStageTwoComplete(true);
      console.log("Stage 2 complete");
    } else if (
      selectedPlayers &&
      selectedVenture &&
      ventureTitle &&
      selectedImage &&
      ventureDescription &&
      selectedTime
    ) {
      setStageOneComplete(true);
      setStageTwoComplete(true);
      setStageThreeComplete(true);
      console.log("Stage 3 complete");
    } else {
      console.log("No change to stage progression");
    }
  }

  function updatePreview() {}

  useEffect(() => {
    checkStageProgress();
    updatePreview();
  }, [
    selectedPlayers,
    selectedVenture,
    ventureTitle,
    selectedImage,
    ventureDescription,
    selectedTime,
  ]);

  useEffect(() => {
    checkStageProgress();
  }, []);

  function selectRadio(selection) {
    setSelectedPlayers(selection);
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
        <p>Tasks: {saveData?.tasks.length || 0}</p>
      </div>
      <div className="fixed top-0 right-0 bg-svBg flex flex-col gap-2">
        <h3>LOCAL SAVEDATA</h3>
        <p>STATE Players: {selectedPlayers}</p>
        <p>STATE Type: {selectedVenture}</p>
        <p>STATE Title: {ventureTitle}</p>
        <div className="h-[100px] w-[100px] overflow-clip">
          <img
            src={`${selectedImage || "./icons/missingImage.svg"}`}
            alt=" image"
            className="min-w-full min-h-full"
          />
        </div>
        <p>STATE Description: {ventureDescription}</p>
        <p>STATE Time: {selectedTime}</p>
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
        <div className="w-full flex flex-col mt-[20px]">
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
        <ConditionalExpandable condition={stageTwoComplete}>
          <Description
            ventureDescription={ventureDescription}
            setVentureDescription={setVentureDescription}
          />
          <Time selectedTime={selectedTime} setSelectedTime={setSelectedTime} />
        </ConditionalExpandable>
      </div>
    </div>
  );
}
