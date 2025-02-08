import {createClient} from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
    try {
        const supabase = createClient(
            process.env.SUPABASE_URL as string,
            process.env.SUPABASE_KEY as string
        )
        const body = await readBody(event)

        const {data, error} = await supabase
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
        //if the school insert is successful, create classes from std 1 to 8
        const school_id = data[0].id;
        const {data: class_data, error: class_error} = await supabase
            .from("classes")
            .insert([
                    {
                        name: "standard 1",
                        school_id: school_id
                    }, {
                        name: "standard 2",
                        school_id: school_id
                    },
                    {
                        name: "standard 3",
                        school_id: school_id
                    },
                    {
                        name: "standard 4",
                        school_id: school_id
                    },
                    {
                        name: "standard 5",
                        school_id: school_id
                    },
                    {
                        name: "standard 6",
                        school_id: school_id
                    },
                    {
                        name: "standard 7",
                        school_id: school_id
                    },
                    {
                        name: "standard 8",
                        school_id: school_id
                    }
                ]
            )
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
