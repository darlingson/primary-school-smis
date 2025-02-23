import { defineEventHandler } from 'h3'
import useSupabaseClient from "~/composables/useSupabase";

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        console.log(body)
        const supabase = useSupabaseClient();
        const schoolId = event.context.params?.schoolId;
        const classId = event.context.params?.classId;

        if (!body || typeof body !== 'object') {
            throw new Error('Invalid request body: expected an object');
        }

        if (!body.subjects || !Array.isArray(body.subjects)) {
            throw new Error('Invalid request body: expected "subjects" array');
        }

        const subjectsToInsert = [];
        for (const subject of body.subjects) {
            if (typeof subject !== 'object') {
                throw new Error(`Invalid subject: expected an object`);
            }

            if (!subject.name || typeof subject.name !== 'string') {
                throw new Error(`Invalid subject: expected "name" to be a string`);
            }

            if (!subject.class_id || typeof subject.class_id !== 'number') {
                throw new Error(`Invalid subject: expected "class_id" to be a number`);
            }

            subjectsToInsert.push({
                name: subject.name,
                class_id: subject.class_id,
            });
        }

        const { error } = await supabase
            .from('subjects')
            .insert(subjectsToInsert);

        if (error) {
            throw error;
        }

        return {
            status: 'success',
            message: 'Subjects added successfully',
        };
    } catch (error) {
        console.error('Error adding subjects:', error);
        return {
            status: 'error',
            message: 'Failed to add subjects',
        };
    }
})