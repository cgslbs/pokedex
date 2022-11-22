import { atom } from "jotai";
import { Pokemon } from "../interfaces/interfaces";

export const selectedPokemonAtom = atom<null | Pokemon>(null)