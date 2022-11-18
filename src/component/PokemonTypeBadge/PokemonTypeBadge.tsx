import { Badge } from "@mantine/core";
import { _Badge } from "@mantine/core/lib/Badge/Badge";
import { Pokemon, Type } from "../../interfaces/interfaces";
import { PokemonTypeBadgeProps } from "./PokemonTypeBadge.types";

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
  DARK: "dark",
  UNKNOWN: "unknown",
  SHADOW: "shadow",
};

const PokemonTypeBadge = (props : PokemonTypeBadgeProps) => {
  const {pokemontype} = props;
  return (
    <Badge
    {...props}
      key={pokemontype}
      color={COLORS_KEY[pokemontype.toUpperCase() as keyof typeof COLORS_KEY]}
    >
      {pokemontype === "unknown" ? "???" : pokemontype}
    </Badge>
  );
};

export default PokemonTypeBadge;
