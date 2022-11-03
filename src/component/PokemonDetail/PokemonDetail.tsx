import {
  Badge,
  Container,
  Grid,
  Group,
  Stack,
  ThemeIcon,
  Title,
  Tooltip,
  Image,
  Text,
} from "@mantine/core";
import useSWR from "swr";
import { Pokemon } from "../../interfaces/interfaces";
import { fetchPokemonById } from "../../service/pokemon";
import {
  PokemonAbilities,
  PokemonStats,
  PokemonTypes,
} from "./PokemonDetail.component";
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
      </Stack>
    </Container>
  );
};

export default PokemonDetail;
