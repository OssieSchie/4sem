import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pfcdpmvnxqewlnmxnpoy.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmY2RwbXZueHFld2xubXhucG95Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4Mjk5NjcsImV4cCI6MjA0OTQwNTk2N30.K5kn5ToLASy8008_3E60o2OSYjrc5kT95-mOTGJioTw";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(req) {
  try {
    const id = req.nextUrl.searchParams.get("id");

    const { data, error } = await supabase
      .from("ventures")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw error;
    }

    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
