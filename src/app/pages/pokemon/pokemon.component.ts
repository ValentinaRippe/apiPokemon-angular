import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Pokemon } from '@shared/interface/pokemon.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss'],
})
export class PokemonComponent implements OnInit {
  namePokemon: any = 'pikachu';
  nameSearch!: string;
  colorType!: string;
  pokemon: Pokemon = {
    id: 0,
    name: '',
    image: '',
    stat: [
      {
        base_stat: 0,
        stat: {
          name: '',
        },
      },
    ],
    types: [
      {
        type: {
          name: '',
        },
      },
    ],
    abilities: [
      {
        ability: {
          name: '',
        },
      },
    ],
  };

  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap =>{
      this.namePokemon = paramMap.get('name')
    })
    this.getService(this.namePokemon);
  }

  getService(name: string) {
    this.pokemonService.getPokemon(String(name)).subscribe((data: any) => {
      this.pokemon = data;
      this.pokemon.image = data.sprites.other['official-artwork'].front_default;
      this.pokemon.stat = data.stats;
      this.pokemon.name =
        data.name.charAt(0).toUpperCase() + data.name.slice(1);
    });
  }

  getPrincipalType(type: string) {
    return 'var(--' + type + ')';
  }

  progressStat(stat: number) {
    let calc = (stat / 270) * 100;
    return calc + '%';
  }

  search() {
    this.getService(this.nameSearch.toLowerCase().normalize('NFD'));
    this.nameSearch = '';
  }
}
