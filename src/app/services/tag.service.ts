import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TagDTO } from '../models/tag-dto';

const cabecera = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class TagService {
  private url = environment.apiUrl;
  private requestMapping = '/tags/';

  constructor(private httpClient: HttpClient) {}

  getAllTags() {
    return this.httpClient.get<TagDTO[]>(
      this.url + this.requestMapping,
      cabecera
    );
  }
}
