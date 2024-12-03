"use client";
import { useState } from "react";
import RadioButton from "./toolComps/RadioButton";
import VentureDropDown from "./toolComps/VentureDropdown";

export default function ToolParent({ ventureArray }) {
  const [selectedPlayers, setSelectedPlayers] = useState(0);
  const [selectedVenture, setSelectedVenture] = useState("Select Venture type");

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
    </div>
  );
}
