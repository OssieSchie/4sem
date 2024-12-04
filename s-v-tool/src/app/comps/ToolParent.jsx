"use client";
import { useState, useEffect } from "react";
import RadioButton from "./toolComps/RadioButton";
import VentureDropDown from "./toolComps/VentureDropdown";
import ConditionalExpandable from "./toolComps/conditionalExpandable";
import VentureTitle from "./toolComps/VentureTitle";

export default function ToolParent({ ventureArray, saveData }) {
  const [selectedPlayers, setSelectedPlayers] = useState(0);
  const [selectedVenture, setSelectedVenture] = useState("Select Venture type");
  const [ventureTitle, setVentureTitle] = useState(false);

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
    <div className="bg-svBg p-[14px]">
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
      </ConditionalExpandable>
    </div>
  );
}
