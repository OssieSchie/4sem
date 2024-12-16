import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseUrl = "https://pfcdpmvnxqewlnmxnpoy.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmY2RwbXZueHFld2xubXhucG95Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4Mjk5NjcsImV4cCI6MjA0OTQwNTk2N30.K5kn5ToLASy8008_3E60o2OSYjrc5kT95-mOTGJioTw";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request) {
  try {
    const body = await request.json();
    const { id, data } = body;

    console.log("Attempting operation with ID:", id);

    // First, check if the record exists
    if (id) {
      const { data: existingRecord, error: findError } = await supabase
        .from("ventures")
        .select("*")
        .eq("id", id)
        .single();

      console.log("Existing record check:", { existingRecord, findError });

      if (!existingRecord) {
        console.log("No record found with ID:", id);
        return NextResponse.json(
          { error: "Record not found" },
          { status: 404 }
        );
      }
    }

    // Prepare the data to match database schema
    const preparedData = {
      players: Number(data.players),
      type: Number(data.type),
      title: String(data.title),
      image: String(data.image),
      imageX: data.imageX !== null ? Number(data.imageX) : null,
      imageY: data.imageY !== null ? Number(data.imageY) : null,
      desc: String(data.desc),
      time: Number(data.time),
      tasks: Array.isArray(data.tasks) ? data.tasks : JSON.parse(data.tasks),
    };

    console.log("Prepared data:", preparedData);

    let result;
    if (id) {
      // First update
      const updateResult = await supabase
        .from("ventures")
        .update(preparedData)
        .eq("id", id);

      console.log("Update operation result:", updateResult);

      // Then fetch the updated record
      const { data: updatedRecord, error: fetchError } = await supabase
        .from("ventures")
        .select("*")
        .eq("id", id)
        .single();

      console.log("Fetched updated record:", updatedRecord);

      if (fetchError) {
        console.error("Error fetching updated record:", fetchError);
        return NextResponse.json(
          { error: fetchError.message },
          { status: 400 }
        );
      }

      result = { error: null, data: [updatedRecord] };
    } else {
      result = await supabase.from("ventures").insert([preparedData]).select();
      console.log("Insert result:", result);
    }

    const { data: responseData, error } = result;

    if (error) {
      console.error("Operation error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      {
        message: id ? "Update successful" : "Creation successful",
        data: responseData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
