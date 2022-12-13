import { Card, Title, Stack, Group, Badge, Image } from "@mantine/core";
import { useAtom } from "jotai";
import { openedDialog } from "../../states/openedDialog.states";
import { selectedPokemonAtom } from "../../states/selectedPokemon.states";
import PokemonTypeBadge from "../PokemonTypeBadge/PokemonTypeBadge";
import { PokemonCardProps } from "./PokemonList.types";

export const SingleCard = ({ pokemon }: PokemonCardProps) => {

  const [_currentPokemon, updateCurrentPokemon] = useAtom(selectedPokemonAtom)
  const [_isOpened, updateIsOpened] = useAtom(openedDialog)

  return (
    <Card
      radius="md"
      shadow="sm"
      key={pokemon.id}
      onClick={ () =>{  
        updateCurrentPokemon(pokemon);
        updateIsOpened(true)
      }}
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
