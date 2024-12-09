import { NextResponse } from "next/server";

export async function GET(request) {
  const saveDataFull = {
    players: 3,
    type: 4,
    title: "Kreizey Venture title",
    image: "https://i.imgur.com/3cVlvTP.jpeg",
    imageX: 0,
    imageY: -260,
    desc: "Example of a venture description, featuring exciting facts and stories hihihi",
    time: 120,
    tasks: [
      {
        locationAdr: "Slagelsegade 11, 1st th",
        locationGeo: [55.693425, 12.557004],
        desc: "Go over here and jump 28351732c times before doing a cool move",
        image: "https://i.imgur.com/3cVlvTP.jpeg",
      },
      {
        locationAdr: "Mogensvej 47, 2b",
        locationGeo: [55.693425, 12.557004],
        desc: "Find Mogens, han kan ikke gemme sig for evigt",
        image:
          "https://danmarkshistorien.dk/fileadmin/_processed_/5/f/csm_Mogens_Glistrup_ddb3368d5d.jpg",
      },
    ],
  };

  const saveDataHalf = {
    players: 3,
    type: 4,
    title: null,
    image: null,
    imageX: null,
    imageY: null,
    desc: null,
    time: null,
    tasks: [],
  };

  const saveDataEmpty = {
    players: null,
    type: null,
    title: null,
    image: null,
    imageX: null,
    imageY: null,
    desc: null,
    time: null,
    tasks: [],
  };

  try {
    const { searchParams } = new URL(request.url);
    const dataType = searchParams.get("type");

    let saveData;

    if (dataType === "Full") {
      saveData = saveDataFull;
    } else if (dataType === "Half") {
      saveData = saveDataHalf;
    } else if (dataType === "Empty") {
      saveData = saveDataEmpty;
    } else {
      saveData = saveDataFull;
    }

    if (!dataType) {
      console.log("No saveData found");
      return NextResponse.json(
        { success: false, error: "No saveData found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: saveData },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
