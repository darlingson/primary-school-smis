import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
    try {
        const supabase = createClient(
            process.env.SUPABASE_URL as string,
            process.env.SUPABASE_KEY as string
        )
        const body = await readBody(event)

        const { data, error } = await supabase
            .from('schools')
            .insert([
                {
                    name: body.name,
                    location: body.location,
                    contact_email: body.contactEmail,
                    contact_phone: body.contactPhone,
                    address: body.address
                }
            ])
            .select()

        if (error) {
            throw error
        }

        return {
            status: 'success',
            data
        }
    } catch (error) {
        return {
            status: 'error',
            error: error instanceof Error ? error.message : 'An unknown error occurred'
        }
    }
})
