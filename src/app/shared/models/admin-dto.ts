import { ImageDataDTO } from "./image-data";

export interface AdminDTO {
    id: number;
    email: string;
    phoneNumber: string;
    password: string;
    name: string;
    surname: string;
    city: string;
    profilePicture: string;
    imageData?: ImageDataDTO;
}