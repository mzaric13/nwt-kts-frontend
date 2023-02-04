export interface DecodedToken {
    aud: string;
    exp: number;
    iat: number;
    iss: string;
    role: string;
    sub: string;
}