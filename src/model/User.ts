export enum UserRole {
    DRIVER = 'DRIVER',
    PASSENGER = 'PASSENGER',
}

export interface Ride {
    amount: number;
    from: {
        latitude: number;
        longitude: number;
    };
    to: {
        latitude: number;
        longitude: number;
    };
    timestamp: number;
}

type User = {
    displayName?: string | undefined | null;
    email?: string | undefined | null;
    metadata?: any | undefined | null;
    phoneNumber: string | undefined | null;
    firstName: string;
    lastName: string;
    photoURL?: string | undefined | null;
    emailVerified?: boolean;
    useRole: UserRole;
    gender: string;
    rides?: Array<Ride>;
    status?: boolean;
};

export default User;
