export interface pokepage {
  name: string;
  url: string;
  image: string;

  spirites?: {
    front_default: string;
  };
}

export interface pokeDetailed {
  name: string;
  spirites: {
    front_default: string;
  };
  types: {
    type: {
      name: string;
    };
  }[];
}

export interface typePokeDetailed {
  name: string;
  image: string;
  type: string;
  typeTwo?: string;
  url?: string;
}

export interface myPokedex {
  name: string;
  alias: string;
  image: string;
  type: string;
  typeTwo: string;
}
