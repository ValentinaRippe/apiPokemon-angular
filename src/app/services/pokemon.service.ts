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
  getPokemonsAll(url: string) {
    return this.http.get(url);
  }
  getPokemonDetails(name: string) {
    return this.http.get(`${this.url}/${name}`);
  }
  getSearch(): Observable<any>{
    return this.http.get(`${this.url}/?limit=100000&offset=0`)
  }
}
