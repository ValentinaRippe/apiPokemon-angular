import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { PokemonDetails, Pages } from '@shared/interface/pokemon.interface';
import { PokemonService } from 'src/app/services/pokemon.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss'],
})
export class PokemonsComponent implements OnInit {
  @Input() results: PokemonDetails[] = [];

  isLoading = false
  pokemons: PokemonDetails[] = [];
  currentPages = 0;
  url: string = environment.api;
  urlNext!: string;
  urlPrevious!: string;
  buttonPages: Pages = {
    next: false,
    prev: false,
  };
  constructor(private pokemonsService: PokemonService) {
  }

  ngOnInit() {
    this.pokemonsService.getPokemonsAll(this.url).subscribe((data: any) => {
      this.results = data.results
    });
    this.getService()
  }
  getService() {
    this.pokemonsService.getPokemonsAll(this.url).subscribe((data: any) => {
      this.results = data.results
      this.getAllPokemons(this.results)
    });
  }
  getAllPokemons(res: any = [], cur: number = 0) {
    this.isLoading = true
    this.results = res
    if (res.length > cur + 20) {
      this.buttonPages.next = true
    } else {
      this.buttonPages.next = false
    }
    if (this.currentPages > 0) {
      this.buttonPages.prev = true
    }else{
      this.buttonPages.prev = false
    }
    res.slice(cur, cur + 20).map((info: any) => {
      this.pokemonsService
        .getPokemonDetails(info.name)
        .subscribe((data: any) => {
          const { id, name } = data;
          this.pokemons.push({ id, name });
          this.pokemons.sort((a, b) => a.id - b.id)
          this.isLoading = false
        });
    });
  }
  search(res: any) {
    this.pokemons = []
    this.currentPages = 0
    this.getAllPokemons(res)
  }

  next = () => {
    this.pokemons = []
    this.getAllPokemons(this.results, this.currentPages += 20)
  };

  prev = () => {
    if (this.currentPages > 0) {
      this.buttonPages.prev = false
      this.pokemons = []
      this.getAllPokemons(this.results, this.currentPages -= 20)
    }
  };
}

