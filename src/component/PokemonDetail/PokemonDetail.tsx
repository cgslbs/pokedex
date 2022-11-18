import { Container, Group, Stack, Title, Image, Text } from "@mantine/core";
import { ErrorBoundary } from "react-error-boundary";
import useSWR from "swr";
import { Pokemon } from "../../interfaces/interfaces";
import { fetchPokemonById } from "../../service/pokemon";
import { PokemonAbilities, PokemonDamages, PokemonStats, PokemonTypes } from "./PokemonDetail.component";
import { usesStyles } from "./PokemonDetail.styled";

const PokemonDetail = ({ pokemonId }: { pokemonId: number }) => {
  const { classes } = usesStyles();
  const { data } = useSWR<Pokemon>(["slug-pokemon", pokemonId], () =>
    fetchPokemonById(pokemonId)
  );

  if (typeof data === "undefined") {
    return <Text>Loading...</Text>;
  }

  return (
    <Container className={classes.pokemonProfile} size="xs">
      <Title transform="capitalize">{data.name}</Title>
      <Group position="center">
        <Image
          radius="md"
          src={data.sprites.other?.["official-artwork"].front_default}
          alt={data.name}
        />
      </Group>
      <Stack>
        <PokemonTypes pokemonTypes={data.types} />
        <PokemonAbilities pokemonAbilities={data.abilities} />
        <PokemonStats pokemonStats={data.stats} />
        
        <PokemonDamages pokemonTypes={data.types} />
      </Stack>
    </Container>
  );
};

export default PokemonDetail;
