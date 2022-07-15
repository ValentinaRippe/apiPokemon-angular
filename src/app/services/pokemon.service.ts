import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private url: string = environment.api;

  constructor(private http: HttpClient) {}

  getPokemon(namePokemon: string) {
    return this.http.get(`${this.url}/${namePokemon}`);
  }
  getPokemonsAll(url: string = this.url, offset: number = 0, limit: number = 1200): Observable<any> {
    return this.http.get(url+`/?limit=${limit}&offset=${offset}`);
  }
  getPokemonDetails(name: string) {
    return this.http.get(`${this.url}/${name}`);
  }
}
