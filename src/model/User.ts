export enum UserRole {
    DRIVER = 'DRIVER',
    PASSENGER = 'PASSENGER',
}

type User = {
    displayName?: string | undefined | null;
    email?: string | undefined | null;
    metadata?: any | undefined | null;
    phoneNumber: string | undefined | null;
    uid?: string | undefined | null;
    firstName: string;
    lastName: string;
    photoURL: string | undefined | null;
    emailVerified?: boolean;
    useRole: UserRole;
    gender: string;
};

export default User;
