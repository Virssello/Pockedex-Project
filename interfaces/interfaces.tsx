export interface Type {
    type: { name: string };
  }
export interface Pokemon {
    id: number;
    name: string;
    height: number;
    weight: number;
    url: string;
    types: Type[];
    sprites: {
      front_default: string;
    };
  }
  