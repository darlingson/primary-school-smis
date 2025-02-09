import {createClient} from '@supabase/supabase-js'
import bcrypt from "bcryptjs";

interface SchoolInput {
    name: string
    phone_number: string
    address: string
}

interface AdminInput {
    firstname: string
    lastname: string
    email: string
    password: string
}

interface ApiResponse<T> {
    status: 'success' | 'error'
    data?: T
    error?: string
}

export default defineEventHandler(async (event): Promise<ApiResponse<any>> => {
    const supabase = createClient(
        process.env.SUPABASE_URL as string,
        process.env.SUPABASE_KEY as string
    )

    try {
        // Input validation
        const body = await readBody(event)
        const {school, admin} = body
        console.table(admin)
        if (!school?.name || !school?.phone_number || !school?.address) {
            throw new Error('Missing required school information')
        }

        if (!admin?.firstname || !admin?.lastname || !admin?.email || !admin?.password) {
            throw new Error('Missing required admin information')
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(admin.email)) {
            throw new Error('Invalid email format')
        }

        const {data: schoolData, error: schoolError} = await supabase
            .from('schools')
            .insert([
                {
                    name: school.name,
                    phone_number: school.phone_number,
                    address: school.address
                }
            ])
            .select('id, name')
            .single()

        if (schoolError) {
            console.error('School creation error:', schoolError)
            throw new Error('Failed to create school')
        }

        const hashedPassword = await bcrypt.hash(admin.password, 10);
        const {data: adminData, error: adminError} = await supabase
            .from('users')
            .insert([
                {
                    firstname: admin.firstname,
                    lastname: admin.lastname,
                    email: admin.email,
                    password: hashedPassword,
                    role: "school_admin"
                }
            ])
            .select('id, email')
            .single()

        if (adminError) {
            console.error('Admin creation error:', adminError)
            console.error('Admin creation error:', adminData)
            await supabase
                .from('schools')
                .delete()
                .match({id: schoolData.id})
            throw new Error('Failed to create admin user')
        }

        const {error: schoolAdminError} = await supabase
            .from('school_admins')
            .insert([{
                admin_id: adminData.id,
                school_id: schoolData.id
            }])

        if (schoolAdminError) {
            console.error('School admin relationship error:', schoolAdminError)
            await Promise.all([
                supabase.from('schools').delete().match({id: schoolData.id}),
                supabase.from('user').delete().match({id: adminData.id})
            ])
            throw new Error('Failed to create school-admin relationship')
        }

        // Create default classes
        const standardClasses = Array.from({length: 8}, (_, i) => ({
            name: `standard ${i + 1}`,
            school_id: schoolData.id
        }))

        const {error: classError} = await supabase
            .from("classes")
            .insert(standardClasses)

        if (classError) {
            console.error('Class creation error:', classError)
        }

        return {
            status: 'success',
            data: {
                school: schoolData,
                admin: {
                    id: adminData.id,
                    email: adminData.email,
                    firstname: admin.firstname,
                    lastname: admin.lastname
                }
            }
        }

    } catch (error) {
        console.error('Operation failed:', error)

        return {
            status: 'error',
            error: error instanceof Error
                ? error.message
                : 'An unexpected error occurred while creating the school'
        }
    }
})