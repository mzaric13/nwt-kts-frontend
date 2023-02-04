import { SocialUser } from "@abacritt/angularx-social-login";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable()
export class SocialAuthServiceMock {

    constructor() {}

    public signIn(id: string) {
        return of(id);
    }

    get authState(): Observable<SocialUser> {
        return of(new SocialUser());
    }

}