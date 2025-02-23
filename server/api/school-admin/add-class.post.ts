import useSupabaseClient from "~/composables/useSupabase";

interface ApiResponse<T> {
    status: 'success' | 'error';
    data?: T;
    error?: string;
}

interface ClassRequest {
    name: string;
    divisions: { name: string }[];
}

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    console.log(body)
    const { class_data: classData, user_id } = body;
    const supabase = useSupabaseClient();
    const { data: userFromDb } = await supabase
        .from("users")
        .select("role")
        .eq("id", user_id)
        .single();
    console.log(userFromDb)
    if (userFromDb?.role !== "school_admin") {
        return {
            status: "error",
            error: "Only school admins can add classes",
        };
    }
    const { data: schoolAdmin } = await supabase
        .from("school_admins")
        .select("school_id")
        .eq("admin_id", user_id)
        .single();
    console.log(schoolAdmin)
    if (!schoolAdmin) {
        return {
            status: "error",
            error: "School admin not found",
        };
    }
    const { data: classDataFromDb, error: classError } = await supabase
        .from("classes")
        .insert({
            name: classData.name,
            school_id: schoolAdmin.school_id,
        })
        .select()
        .single();
    if (classError) {
        return {
            status: "error",
            error: classError.message,
        };
    }
    for (const division of classData.divisions) {
        const { error: divisionError } = await supabase
            .from("class_divisions")
            .insert({
                class_id: classDataFromDb.id,
                name: division.name,
            });

        if (divisionError) {
            return {
                status: "error",
                error: divisionError.message,
            };
        }
    }
    return {
        status: "success",
    };
});