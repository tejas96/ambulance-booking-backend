export interface Location {
    latitude: number;
    longitude: number;
    city: string;
    state: string;
    country: string;
    pinCode: string;
    locality: string;
}

export interface HospitalRegistration {
    location: Location;
    hospitalName: string;
    description: string;
}
