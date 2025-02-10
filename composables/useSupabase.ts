import { createClient } from "@supabase/supabase-js";

const useSupabaseClient = () => {
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
        throw new Error("Missing Supabase URL or Key in environment variables.");
    }

    const supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_KEY
    );
    return supabase;
}

export default useSupabaseClient;