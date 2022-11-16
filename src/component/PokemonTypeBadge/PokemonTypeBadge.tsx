import { Badge } from "@mantine/core";
import { Pokemon, Type } from "../../interfaces/interfaces";

const COLORS_KEY = {
  GRASS: "green",
  POISON: "grape",
  FIRE: "red",
  ICE: "cyan",
  WATER: "blue",
  NORMAL: "gray",
  BUG: "lime",
  ELECTRIC: "yellow",
  ROCK: "rock",
  FAIRY: "corail",
  FIGHTING: "orange",
  PSYCHIC: "pink",
  FLYING: "indigo",
  DRAGON: "dragon",
  STEEL: "steel",
  GROUND: "sand",
  GHOST: "violet",
  DARK: "dark"
};

const PokemonTypeBadge = ({ pokemonType }: { pokemonType: string }) => {
  return (
    <Badge
      key={pokemonType}
      color={COLORS_KEY[pokemonType.toUpperCase() as keyof typeof COLORS_KEY]}
    >
      {pokemonType}
    </Badge>
  );
};

export default PokemonTypeBadge;
