import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_VENTURES_URL;
const supabaseKey = process.env.SUPABASE_VENTURES_API;
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
