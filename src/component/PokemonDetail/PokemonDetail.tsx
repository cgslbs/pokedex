import { Container, Group, Stack, Title, Image, Text, Center, Loader } from "@mantine/core";
import useSWR from "swr";
import { Pokemon } from "../../interfaces/interfaces";
import { fetchPokemonById } from "../../service/pokemon";
import { PokemonAbilities, PokemonStats, PokemonTypes } from "./PokemonDetail.component";
import { usesStyles } from "./PokemonDetail.styles";

const PokemonDetail = ({ pokemonId }: { pokemonId: number }) => {
  const { classes } = usesStyles();
  const { data } = useSWR<Pokemon>(["slug-pokemon", pokemonId], () =>
    fetchPokemonById(pokemonId)
  );

  if (typeof data === "undefined") {
    return <Center><Loader /></Center>;
  }

  return (
    <Container className={classes.pokemonProfile}>
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
      </Stack>
    </Container>
  );
};

export default PokemonDetail;
