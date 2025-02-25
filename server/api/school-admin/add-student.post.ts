import bcrypt from "bcryptjs";
import useSupabaseClient from "~/composables/useSupabase";

interface StudentRegistration {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    guardian_name: string;
    guardian_phone: string;
    date_of_birth: string;
}

interface ApiResponse<T> {
    status: 'success' | 'error';
    data?: T;
    error?: string;
}

interface RegistrationResponse {
    userId: string;
    email: string;
}

export default defineEventHandler(async (event): Promise<ApiResponse<RegistrationResponse>> => {
    const supabase = useSupabaseClient();

    try {
        const body = await readBody(event);
        const { student } = body as { student: Partial<StudentRegistration> };

        const requiredFields: (keyof StudentRegistration)[] = [
            'firstname',
            'lastname',
            'email',
            'guardian_name',
            'guardian_phone',
            'date_of_birth'
        ];

        const missingFields = requiredFields.filter(field => !student?.[field]);
        if (missingFields.length > 0) {
            throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(student.email!)) {
            throw new Error('Invalid email format');
        }

        const hashedPassword = await bcrypt.hash(student.password!, 10);

        const { data: userData, error: userError } = await supabase
            .from('users')
            .insert([{
                firstname: student.firstname,
                lastname: student.lastname,
                email: student.email,
                password: hashedPassword,
                role: "student"
            }])
            .select('id, email')
            .single();

        if (userError) {
            throw new Error(`Failed to create user: ${userError.message}`);
        }

        if (!userData) {
            throw new Error('User creation failed: No data returned');
        }

        const { error: studentError } = await supabase
            .from('students')
            .insert([{
                guardian_name: student.guardian_name,
                guardian_phone: student.guardian_phone,
                date_of_birth: student.date_of_birth,
                user_id: userData.id,
            }]);

        if (studentError) {
            await supabase
                .from('users')
                .delete()
                .eq('id', userData.id);

            throw new Error(`Failed to create student record: ${studentError.message}`);
        }

        return {
            status: 'success',
            data: {
                userId: userData.id,
                email: userData.email
            }
        };
    } catch (error) {
        console.error('Registration failed:', error);

        return {
            status: 'error',
            error: error instanceof Error
                ? error.message
                : 'An unexpected error occurred during registration'
        };
    }
});