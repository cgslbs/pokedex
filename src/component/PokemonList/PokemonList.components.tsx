import { Card, Title, Stack, Group, Badge, Image } from "@mantine/core";
import { useRouter } from "next/router";
import { Pokemon } from "../../interfaces/interfaces";
import { PokemonCardProps } from "./PokemonList.types";
const COLORS_KEY = {
  GRASS: "green",
  POISON: "grape",
  FIRE: "red",
  WATER: "cyan",
  FLY: "blue",
  NORMAL: "gray",
  BUG: "lime",
};

export const SingleCard = ({ pokemon }: PokemonCardProps) => {
  const router = useRouter()
  const redirectToPokemon = (pokemonId: number) => {
    router.push({pathname: '/pokemon/[pokemonId]', query: { pokemonId: pokemonId },})
  }
  return (
    <Card radius="md" shadow="sm" key={pokemon.id} onClick={() => redirectToPokemon(pokemon.id)}>
      <Title order={4} align="center" transform="uppercase">
        {pokemon.name}
      </Title>
      <Stack align="center">
        <Image
          width={150}
          height={150}
          radius="md"
          src={pokemon.sprites.other?.["official-artwork"].front_default}
          alt={pokemon.name}
        />
        <Group>
          {pokemon.types.map((T) => {
            return (
              <Badge
                key={T.slot}
                color={
                  COLORS_KEY[
                    T.type.name.toUpperCase() as keyof typeof COLORS_KEY
                  ]
                }
              >
                {T.type.name}
              </Badge>
            );
          })}
        </Group>
      </Stack>
    </Card>
  );
};
