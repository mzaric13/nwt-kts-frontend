import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { PassengerRatingDTO } from "../models/passenger-rating-dto";
import { RatingDTO } from "../models/rating-dto";
import { TokenService } from "./token.service";

@Injectable({
    providedIn: 'root',
  })
  export class RatingService {

    private url = environment.apiUrl;
    newHeader = {headers: new HttpHeaders({'Content-Type' : 'application/json', 'Authorization': 'Bearer ' + this.tokenService.getToken()})};

    constructor(private httpClient: HttpClient, private tokenService: TokenService) { }

    public getDriveRatings(id: number) {
        return this.httpClient.get<Array<RatingDTO>>(`http://localhost:9000/ratings/get-drive-ratings/${id}`, this.newHeader);
    }

    public getDriverAndVehicleAverageRating(id: number) {
        return this.httpClient.get<Array<number>>(`http://localhost:9000/ratings/get-driver-and-vehicle-average-rating/${id}`, this.newHeader);
    }

    public findPassengersEligibleRatings() {
        return this.httpClient.get<Array<PassengerRatingDTO>>(`http://localhost:9000/ratings/find-passengers-eligible-ratings`, this.newHeader);
    }

    public createRating(ratingDTO: RatingDTO) {
        return this.httpClient.post<RatingDTO>(this.url + '/ratings/create-rating', ratingDTO, this.newHeader);
      }

  }