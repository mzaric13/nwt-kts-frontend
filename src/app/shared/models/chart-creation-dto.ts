import { ChartObjectCreationDTO } from "./chart-object-creation-dto";

export interface ChartCreationDTO {
    drivesPerDay: ChartObjectCreationDTO,
    drivenKilometersPerDay: ChartObjectCreationDTO,
    moneySpentOrEarnedPerDay: ChartObjectCreationDTO
}