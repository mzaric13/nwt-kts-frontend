export class PassengerCreationDTO {

    email: string;
    name: string;
    surname: string;
    city: string;
    phoneNumber: string;
    password: string;
    passwordConfirm: string;

    constructor(email: string, name: string, surname:string, city: string, phoneNumber: string, password: string, passwordConfirm: string){
        this.email = email;
        this.name = name;
        this.surname = surname;
        this.city = city;
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.passwordConfirm = passwordConfirm;
    }
    
}