import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import OpenStreetMapProvider from 'leaflet-geosearch/lib/providers/openStreetMapProvider';
import {PointCreationDTO} from '../models/point-creation-dto'

@Injectable({
  providedIn: 'root',
})
export class GeocodeService {
  constructor(
    private httpClient: HttpClient,
  ) {}

  public async getGeocodes(address: string) {
    let provider: OpenStreetMapProvider = new OpenStreetMapProvider({
      params: {
        countryCodes: 'rs',
      },
    });
    let result = await provider.search({ query: address });
    return result;
  }

  public getRoutes(locations: PointCreationDTO[]) {
    let points = ''
    for (let location of locations) {
      points += location.longitude + ',' + location.latitude + ';'
    }
    points = points.slice(0, -1);
    return this.httpClient.get(`https://routing.openstreetmap.de/routed-car/route/v1/driving/${points}?geometries=geojson&overview=false&alternatives=true&steps=true`);
  }
}
