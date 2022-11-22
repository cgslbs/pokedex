import axios from "axios";
import { AllPokemonsDto, Pokemon, Ability, Type, Species } from "../interfaces/interfaces";
import { AllAbilitiesDto, PokemonAbility } from "../interfaces/pokemonAbilities";
import { PokemonType } from "../interfaces/pokemonType";

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

export const fetchAllTypes = async (): Promise<Species[]> => {
  try {
    const { data: {results} } = await axios.get(`${BASE_URL}/type`);
    return results
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    return []
  }
}

export const fetchPokemonById = async (pokemonId: number | undefined): Promise<Pokemon> => {
  const { data } = await axios.get<Pokemon>(`${BASE_URL}/pokemon/${pokemonId}`);
  return data;
};

export const fetchAllPokemonAbilities = async (pokemonAbilities:Ability[] ) : Promise<PokemonAbility[]> => {
  
  const currentPokemonAbilities : PokemonAbility[] = []
  for (const abilityPokemon of pokemonAbilities){
    const { data } = await axios.get<PokemonAbility>(`${abilityPokemon.ability.url}`);
    currentPokemonAbilities.push(data);
  }

  return currentPokemonAbilities
}

export const fetchPokemonType = async (pokemonTypes: Type[])  : Promise<PokemonType[]> => {
  const currentPokemonTypes : PokemonType[] = [];
  for(const typePokemon of pokemonTypes){
    const { data } = await axios.get<PokemonType>(`${typePokemon.type.url}`);
    currentPokemonTypes.push(data);
  }

  return currentPokemonTypes
}