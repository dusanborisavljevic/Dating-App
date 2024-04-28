import { Photo } from "./photo";

export interface Member {
    id: number;
    userName: string;
    photoUrl: string;
    knownAs: string;
    creted?: Date;
    lastActive: Date;
    dateOfBirth: Date;
    gender: string;
    indroduction?: any;
    lookingFor: string;
    interesets?: any;
    city: string;
    country: string;
    photos: Photo[];
}