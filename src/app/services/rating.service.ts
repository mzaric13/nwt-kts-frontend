import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { PassengerRatingDTO } from "../models/passenger-rating-dto";
import { RatingDTO } from "../models/rating-dto";
import { RequestPage } from "../models/request-page";
import { RequestPageObject } from "../models/request-page-object";
import { TokenService } from "./token.service";

@Injectable({
    providedIn: 'root',
  })
  export class RatingService {

    private url = environment.apiUrl;

    constructor(private httpClient: HttpClient, private tokenService: TokenService) { }

    public getDriveRatings(id: number) {
        let newHeader = {headers: new HttpHeaders({'Content-Type' : 'application/json', 'Authorization': 'Bearer ' + this.tokenService.getToken()})};
        return this.httpClient.get<Array<RatingDTO>>(`http://localhost:9000/ratings/get-drive-ratings/${id}`, newHeader);
    }

    public getDriverAndVehicleAverageRating(id: number) {
        let newHeader = {headers: new HttpHeaders({'Content-Type' : 'application/json', 'Authorization': 'Bearer ' + this.tokenService.getToken()})};
        return this.httpClient.get<Array<number>>(`http://localhost:9000/ratings/get-driver-and-vehicle-average-rating/${id}`, newHeader);
    }

    public findPassengersEligibleRatings() {
        let newHeader = {headers: new HttpHeaders({'Content-Type' : 'application/json', 'Authorization': 'Bearer ' + this.tokenService.getToken()})};
        return this.httpClient.get<Array<PassengerRatingDTO>>(`http://localhost:9000/ratings/find-passengers-eligible-ratings`, newHeader);
    }

    public createRating(ratingDTO: RatingDTO) {
        let newHeader = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.tokenService.getToken(),
          }),
        };
        return this.httpClient.post<RatingDTO>(this.url + '/ratings/create-rating', ratingDTO, newHeader);
      }

  }