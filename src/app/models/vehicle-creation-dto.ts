export class VehicleCreationDTO {
    registrationNumber: string;
    name: string;
    type: string;

    constructor(registrationNumber: string, name: string, type: string) {
        this.registrationNumber = registrationNumber;
        this.name = name;
        this.type = type;
    }
}