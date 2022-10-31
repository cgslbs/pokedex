import axios from "axios";
import { AllPokemonsDto, Pokemon } from "../interfaces/interfaces";

// Set config defaults when creating the instance

const BASE_URL = "https://pokeapi.co/api/v2";

export const fetchAllPokemon = async (): Promise<Pokemon[]> => {
  try {
    const {
      data: { results },
    } = await axios.get<AllPokemonsDto>(`${BASE_URL}/pokemon?offset=0&limit=40`);

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

export const fetchPokemonById = async (pokemonId: number) : Promise<Pokemon> => {
    const { data } = await axios.get<Pokemon>(`${BASE_URL}/pokemon/${pokemonId}`)
    return data
}