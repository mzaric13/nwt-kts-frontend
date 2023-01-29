export class GoogleTokenDto {
    value: string;

    constructor(value: string) {
        this.value = value;
    }
}

export class FacebookTokenDTO {
    value: string;

    name: string;

    surname: string;

    constructor(value: string, name: string, surname: string) {
        this.value = value;
        this.name = name;
        this.surname = surname;
    }
}

export class JwtToken {

    accessToken: string;

    expiresIn: number;

    constructor(accessToken: string, expiresIn: number) {
        this.accessToken = accessToken;
        this.expiresIn = expiresIn;
    }
}

export class LoginEmailPassword {
    
    username: string;

    password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}