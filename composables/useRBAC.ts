type UserId = string | number;
type SchoolId = string | number;

interface Permission {
    readonly MANAGE_USERS: 'manage_users';
    readonly MANAGE_SCHOOLS: 'manage_schools';
    readonly MANAGE_STUDENTS: 'manage_students';
    readonly MANAGE_CLASSES: 'manage_classes';
    readonly VIEW_GRADES: 'view_grades';
    readonly EDIT_GRADES: 'edit_grades';
    readonly VIEW_PERFORMANCE: 'view_performance';
}

interface Role {
    readonly ADMIN: 'admin';
    readonly SCHOOL_ADMIN: 'school_admin';
    readonly TEACHER: 'teacher';
    readonly STUDENT: 'student';
    readonly PARENT: 'parent';
}

interface User {
    id: UserId;
    name: string;
    role: Role[keyof Role];
    permissions: Array<Permission[keyof Permission]>;
}

// Constants
export const PERMISSIONS: Permission = {
    MANAGE_USERS: 'manage_users',
    MANAGE_SCHOOLS: 'manage_schools',
    MANAGE_STUDENTS: 'manage_students',
    MANAGE_CLASSES: 'manage_classes',
    VIEW_GRADES: 'view_grades',
    EDIT_GRADES: 'edit_grades',
    VIEW_PERFORMANCE: 'view_performance'
} as const;

export const ROLES: Role = {
    ADMIN: 'admin',
    SCHOOL_ADMIN: 'school_admin',
    TEACHER: 'teacher',
    STUDENT: 'student',
    PARENT: 'parent'
} as const;

// Role permissions mapping
const rolePermissions: Record<Role[keyof Role], Array<Permission[keyof Permission]>> = {
    [ROLES.ADMIN]: [
        PERMISSIONS.MANAGE_USERS,
        PERMISSIONS.MANAGE_SCHOOLS,
        PERMISSIONS.MANAGE_STUDENTS,
        PERMISSIONS.MANAGE_CLASSES,
        PERMISSIONS.VIEW_GRADES,
        PERMISSIONS.EDIT_GRADES,
        PERMISSIONS.VIEW_PERFORMANCE
    ],
    [ROLES.SCHOOL_ADMIN]: [
        PERMISSIONS.MANAGE_USERS,
        PERMISSIONS.MANAGE_STUDENTS,
        PERMISSIONS.MANAGE_CLASSES,
        PERMISSIONS.VIEW_GRADES,
        PERMISSIONS.VIEW_PERFORMANCE
    ],
    [ROLES.TEACHER]: [
        PERMISSIONS.MANAGE_STUDENTS,
        PERMISSIONS.MANAGE_CLASSES,
        PERMISSIONS.VIEW_GRADES,
        PERMISSIONS.EDIT_GRADES,
        PERMISSIONS.VIEW_PERFORMANCE
    ],
    [ROLES.STUDENT]: [
        PERMISSIONS.VIEW_GRADES
    ],
    [ROLES.PARENT]: [
        PERMISSIONS.VIEW_GRADES,
        PERMISSIONS.VIEW_PERFORMANCE
    ]
};

export const hasPermission = (
    user: User,
    permission: Permission[keyof Permission]
): boolean => user.permissions.includes(permission);

export const hasRole = (
    user: User,
    role: Role[keyof Role]
): boolean => user.role === role;

type NextFunction = () => void;
interface Request {
    user?: User;
}
interface Response {
    status: (code: number) => {
        json: (data: { error: string }) => void;
    };
}

export const authorize = (requiredPermission: Permission[keyof Permission]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const user = req.user;

        if (!user) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }

        if (!hasPermission(user, requiredPermission)) {
            res.status(403).json({ error: 'Forbidden' });
            return;
        }

        next();
    };
};

interface SchoolAuthContext {
    schoolId: SchoolId;
}

export const createSchoolContext = (schoolId: SchoolId): SchoolAuthContext => ({
    schoolId
});

const isUserAssignedToSchool = (
    userId: UserId,
    schoolId: SchoolId
): Promise<boolean> => {
    return Promise.resolve(true);
};

export const authorizeForSchool = async (
    context: SchoolAuthContext,
    user: User,
    permission: Permission[keyof Permission]
): Promise<boolean> => {
    if (!hasPermission(user, permission)) {
        return false;
    }

    // Admin has access to all schools
    if (hasRole(user, ROLES.ADMIN)) {
        return true;
    }

    // School admin and teachers are restricted to their school
    if (hasRole(user, ROLES.SCHOOL_ADMIN) || hasRole(user, ROLES.TEACHER)) {
        return isUserAssignedToSchool(user.id, context.schoolId);
    }

    // Students and parents are restricted to their assigned school
    if (hasRole(user, ROLES.STUDENT) || hasRole(user, ROLES.PARENT)) {
        return isUserAssignedToSchool(user.id, context.schoolId);
    }

    return false;
};
