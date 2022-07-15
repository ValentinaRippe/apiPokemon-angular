import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { ActivatedRoute } from '@angular/router';
import { PokemonDetails } from '@shared/interface/pokemon.interface';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  onSearch!: any;
  @Input() results: PokemonDetails[] = [];
  @Output() resultSearch = new EventEmitter<PokemonDetails[]>();

  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute
  ) {
  }

  //Search pokemons by name
  searchPokemon(value: any) {
    if(this.onSearch.length === 0){
      this.results = []
      this.pokemonService.getPokemonsAll().subscribe((data: any)=>{
        this.resultSearch.emit(data.results)
      })
    }
     const searchResults = this.results.filter((item:any) => {
          return `${item.name}`
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .includes(value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
      })
      this.resultSearch.emit(searchResults)
    }


}
