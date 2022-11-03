import axios from "axios";
import { AllPokemonsDto, Pokemon, Ability } from "../interfaces/interfaces";
import { AllAbilitiesDto, PokemonAbility } from "../interfaces/pokemonAbilities";

// Set config defaults when creating the instance

const BASE_URL = "https://pokeapi.co/api/v2";

export const fetchAllPokemon = async (): Promise<Pokemon[]> => {
  try {
    const {
      data: { results },
    } = await axios.get<AllPokemonsDto>(`${BASE_URL}/pokemon?limit=151&offset=0`);

    const allPokemons: Pokemon[] = [];

    for (const pokemonResponse of results) {
      const { data } = await axios.get<Pokemon>(pokemonResponse.url);
      allPokemons.push(data);
    }

    return allPokemons;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    return [];
  }
};

export const fetchAllAbilities = async (): Promise<PokemonAbility[]> => {
  try {
    const { data: {results} } = await axios.get<AllAbilitiesDto>(`${BASE_URL}/ability?limit=60&offset=0`);
    
    const allAbilities: PokemonAbility[] = [];

    for(const abilityResponse of results){
      const { data} = await axios.get<PokemonAbility>(abilityResponse.url);
      allAbilities.push(data)
    }

    return allAbilities;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    return [];
  }
};

export const fetchPokemonById = async (pokemonId: number): Promise<Pokemon> => {
  const { data } = await axios.get<Pokemon>(`${BASE_URL}/pokemon/${pokemonId}`);
  return data;
};
