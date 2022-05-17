import { Component, OnInit } from '@angular/core';
import { Pokemon, Pages } from '@shared/interface/pokemon.interface';
import { map , finalize} from 'rxjs/operators';
import { PokemonService } from 'src/app/services/pokemon.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss'],
})
export class PokemonsComponent implements OnInit {
  isLoading = false
  onSearch!: string
  data!: [];
  url: string = environment.api + '/?limit=20&offset=0';
  urlNext!: string;
  urlPrevious!: string;
  buttonPages: Pages = {
    next: false,
    previous: false,
  };
  pokemons: Pokemon[] = [];
  constructor(private pokemonsService: PokemonService) {}

  ngOnInit() {
    this.getService(this.url);
  }

  getService(url: string) {
    this.pokemonsService.getPokemonsAll(url).subscribe((data: any) => {
      this.urlNext = data.next;
      this.urlPrevious = data.previous;

      if (this.urlPrevious === null) {
        this.buttonPages.previous = false
      }else{
        this.buttonPages.previous = true
      }

      if (this.urlNext === null) {
        this.buttonPages.next = false
      }else{
        this.buttonPages.next = true
      }

      data.results.map((info: any) => {
        this.pokemonsService
          .getPokemonDetails(info.name)
          .subscribe((data: any) => {
            this.pokemons.push(data);
            this.pokemons.sort((a, b) => a.id - b.id);
          });
      });
    });
  }
  search(value:any){
    this.isLoading = true
    this.pokemonsService
    .getSearch().subscribe((data:any)=>{

    })
  }
  nameSearch(value:any){
   this.pokemonsService
          .getPokemonDetails(value)
          .subscribe((data: any) => {
            this.pokemons = []
            this.pokemons.push(data);
            this.pokemons.sort((a, b) => a.id - b.id);
          });
  }
  next() {
      this.pokemons = [];
      return this.getService(this.urlNext);
  }

  previous() {
      this.pokemons = [];
      return this.getService(this.urlPrevious);
  }
}

