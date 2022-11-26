export class PassengerDTO {

    id: number;
    email: string;
    name: string;
    surname: string;
    city: string;
    phoneNumber: string;
    password: string;
    passwordConfirm: string;
    profilePicture: string;
    activated: boolean;
    isBlocked: boolean;

    constructor(id:number, email: string, name: string, surname:string, city: string, phoneNumber: string, password: string, passwordConfirm: string,
        profilePicture: string, activated: boolean, isBlocked: boolean){
        this.id = id;
        this.email = email;
        this.name = name;
        this.surname = surname;
        this.city = city;
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.passwordConfirm = passwordConfirm;
        this.profilePicture = profilePicture;
        this.activated = activated;
        this.isBlocked = isBlocked;
    }
    
}