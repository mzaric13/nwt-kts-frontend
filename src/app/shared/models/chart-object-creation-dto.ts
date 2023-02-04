import { SeriesObjectCreationDTO } from "./series-object-creation-dto";

export interface ChartObjectCreationDTO {
    name: string,
    series: Array<SeriesObjectCreationDTO>
}