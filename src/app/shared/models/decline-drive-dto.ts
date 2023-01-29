import { DriveDTO } from "./drive-dto";

export interface DeclineDriveDTO {
    driveDTO: DriveDTO;
    reasonForDeclining: string;
}