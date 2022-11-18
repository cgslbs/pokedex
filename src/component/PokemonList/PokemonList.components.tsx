import { Card, Title, Stack, Group, Badge, Image } from "@mantine/core";
import { useRouter } from "next/router";
import { Pokemon } from "../../interfaces/interfaces";
import PokemonTypeBadge from "../PokemonTypeBadge/PokemonTypeBadge";
import { PokemonCardProps } from "./PokemonList.types";

export const SingleCard = ({ pokemon }: PokemonCardProps) => {
  const router = useRouter();
  const redirectToPokemon = (pokemonId: number) => {
    router.push({
      pathname: "/pokemon/[pokemonId]",
      query: { pokemonId: pokemonId },
    });
  };
  return (
    <Card
      radius="md"
      shadow="sm"
      key={pokemon.id}
      onClick={() => redirectToPokemon(pokemon.id)}
    >
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
              <PokemonTypeBadge key={T.type.name} pokemontype={T.type.name} />
            );
          })}
        </Group>
      </Stack>
    </Card>
  );
};
