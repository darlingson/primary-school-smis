import { defineEventHandler } from 'h3'
import useSupabaseClient from "~/composables/useSupabase";

export default defineEventHandler(async (event) => {
    try {
        const supabase = useSupabaseClient();
        const schoolId = event.context.params?.schoolId;
        const { data: classes, error: classesError } = await supabase
            .from('classes')
            .select('id, name')
            .eq('school_id', schoolId)

        if (classesError) {
            throw classesError;
        }

        const result = [];
        for (const classObj of classes) {
            try {
                const { data: classDivs, error: classDivsError } = await supabase
                    .from('class_divisions')
                    .select('id, name')
                    .eq('class_id', classObj.id)

                if (classDivsError) {
                    throw classDivsError;
                }

                const classWithDivisions = {
                    id: classObj.id,
                    name: classObj.name,
                    divisions: classDivs
                };

                result.push(classWithDivisions);
            } catch (error) {
                console.error(`Error fetching divisions for class ${classObj.id}:`, error);
            }
        }

        return result;
    } catch (error) {
        console.error('Error fetching classes:', error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to retrieve classes',
        });
    }
})