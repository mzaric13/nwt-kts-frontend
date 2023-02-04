import { ImageDataDTO } from "./image-data";

export interface UserDTO {
    profilePicture: string;
    email: string;
    name: string;
    surname: string;
    city: string;
    imageData?: ImageDataDTO;
}