export class VehicleDTO {
    id: number;
    registrationNumber: string;
    name: string;
    type: string;

    constructor(id: number, registrationNumber: string, name: string, type: string) {
        this.id = id;
        this.registrationNumber = registrationNumber;
        this.name = name;
        this.type = type;
    }
}