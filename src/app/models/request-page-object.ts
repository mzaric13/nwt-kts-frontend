import { DriveDTO } from "./drive-dto";

export interface RequestPageObject {
    totalItems: number,
    drives: DriveDTO[],
    totalPages: number
}