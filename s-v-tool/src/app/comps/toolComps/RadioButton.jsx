import { useState, useEffect } from "react";

export default function RadioButton({ players, selectedPlayers, selectRadio }) {
  const [nameValue, setNameValue] = useState("");

  useEffect(() => {
    switch (players) {
      case 1:
        setNameValue("Solo");
        console.log("set name value to Solo");
        break;
      case 2:
        setNameValue("Duo");
        console.log("set name value to duo");
        break;
      default:
        setNameValue("Group");
        console.log("set name value to Group");
        break;
    }
  }, [players]);

  return (
    <div
      className={`border-[3px] border-darkerOrange w-[99px] rounded-xl flex flex-col hover:cursor-pointer transition-colors ${
        selectedPlayers === players ? "bg-orangeTeal" : "bg-svBg"
      }`}
      onClick={() => selectRadio(players)}
    >
      <h3 className="text-center">{nameValue}</h3>
      <div className="w-full flex justify-center pb-2 gap-2">
        {Array.from({ length: players }).map((_, index) => (
          <img
            key={index}
            src="./icons/playerCircle.svg"
            alt="player"
            className="h-[23px]"
          />
        ))}
      </div>
    </div>
  );
}
