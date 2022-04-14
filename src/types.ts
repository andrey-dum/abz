export interface IUser {
    email: string;
    id: number;
    name: string;
    phone: string;
    photo: string;
    position: string;
    position_id: number;
    registration_timestamp: number;
}

export interface IPosition {
    id: number | string;
    name: string;
}

export interface DataResponse<T> {
    data: Array<T>;
    status: number;
    statusText: string;
}


