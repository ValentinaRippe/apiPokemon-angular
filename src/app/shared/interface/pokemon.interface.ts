export interface Pokemon {
  id: number;
  name: string;
  image: string;
  stat: [
    {
      base_stat: number;
      stat: {
        name: string;
      };
    }
  ];
  types: [
    {
      type: {
        name: string;
      };
    }
  ];
  abilities: [
    {
      ability: {
        name: string;
      };
    }
  ];
}
export interface PokemonDetails {
  id: number;
  name: string;
}

export interface Pages {
  next:boolean,
  prev:boolean
}

