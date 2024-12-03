"use client";
import { useState, useEffect } from "react";

export default function PlayersIcon({ players }) {
  const [isSolo, setIsSolo] = useState(false);
  const [isDuo, setIsDuo] = useState(false);

  useEffect(() => {
    if (players === 1) {
      setIsSolo(true);
      setIsDuo(false);
      console.log("set players to solo");
    }

    if (players === 2) {
      setIsSolo(false);
      setIsDuo(true);
      console.log("set players to duo");
    }

    if (players > 2) {
      setIsSolo(false);
      setIsDuo(false);
      console.log("set players to group");
    }

    console.log("Players prop has changed:", players);
  }, [players]);

  return (
    <div className=" h-[20px] bg-svBg rounded-full inline-block px-2">
      {isSolo && (
        <p className="font-bold text-darkerTeal">
          <span
            style={{
              display: "inline-block",
              transform: `translate(0, -2px)`,
              fontWeight: "700",
            }}
          >
            ⋅
          </span>{" "}
          solo
        </p>
      )}
      {isDuo && (
        <p className="font-bold text-darkerTeal">
          <span
            style={{
              display: "inline-block",
              transform: `translate(0, -2px)`,
              fontWeight: "700",
            }}
          >
            ⋅⋅
          </span>{" "}
          Duo
        </p>
      )}
      {!isDuo && !isSolo && (
        <p className="font-bold text-darkerTeal">
          <span
            style={{
              display: "inline-block",
              transform: `translate(0, -2px)`,
              fontWeight: "700",
            }}
          >
            ⸫
          </span>{" "}
          Group
        </p>
      )}
    </div>
  );
}
