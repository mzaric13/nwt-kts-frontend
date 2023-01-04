import { Injectable } from '@angular/core';
import OpenStreetMapProvider from 'leaflet-geosearch/lib/providers/openStreetMapProvider';

@Injectable({
  providedIn: 'root',
})
export class GeocodeService {
  constructor() {}

  public async getGeocodes(address: string) {
    let provider: OpenStreetMapProvider = new OpenStreetMapProvider({
      params: {
        countryCodes: 'rs',
      },
    });
    let result = await provider.search({ query: address });
    return result;
  }
}
