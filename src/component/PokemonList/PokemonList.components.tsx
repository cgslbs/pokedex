import { Card, Title, Stack, Group, Badge, Image } from "@mantine/core";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { Pokemon } from "../../interfaces/interfaces";
import { selectedPokemonAtom } from "../../states/selectedPokemon.states";
import PokemonTypeBadge from "../PokemonTypeBadge/PokemonTypeBadge";
import { PokemonCardProps } from "./PokemonList.types";

const CustomPokemonCard = () => {
  // isSelected 
}

export const SingleCard = ({ pokemon }: PokemonCardProps) => {

  const [currentPokemon, updateCurrentPokemon] = useAtom(selectedPokemonAtom)
  return (
    <Card
      radius="md"
      shadow="sm"
      key={pokemon.id}
      onClick={ () =>  updateCurrentPokemon(pokemon)}
    >
      <Title order={4} align="center" transform="uppercase">
        {pokemon.name}
      </Title>
      <Stack align="center">
        <Image
          width={100}
          height={100}
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
