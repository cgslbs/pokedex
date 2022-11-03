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
    FAIRY: "pink",
    FIGHTING: "orange",
    PSYCHIC: "corail",
    FLYING: "indigo",
    DRAGON: "dragon",
    STEEL: "steel",
    GROUND: "sand"
  };

  
const PokemonTypeBadge = ({pokemonType}: {pokemonType : Type}) => {
    return (
      <Badge
      key={pokemonType.slot}
      color={
        COLORS_KEY[
          pokemonType.type.name.toUpperCase() as keyof typeof COLORS_KEY
        ]
      }
    >
      {pokemonType.type.name}
    </Badge>
    )

}

export default PokemonTypeBadge 