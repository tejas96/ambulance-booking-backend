export { default as User, UserRole } from './User';
export * as Http from './Http';
export * as Hospital from './Hospital';

export type userIdListenerPayload = {
    type: 'booking' | 'tracking' | 'bookingRequestStatus';
    payload: any;
    userId: string;
    room: string;
};
