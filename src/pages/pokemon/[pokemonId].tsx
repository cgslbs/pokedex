import { Title, Text, Container, Progress, Stack, Group } from "@mantine/core";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Pokemon } from "../../interfaces/interfaces";
import { fetchPokemonById } from "../../service/pokemon";

const SinglePokemon = () => {
  const router = useRouter();
  const { pokemonId } = router.query;

  const { data } = useSWR<Pokemon>(["slug-pokemon", pokemonId], () =>
    fetchPokemonById(+(pokemonId as string))
  );

  if(typeof data === "undefined") {
    return <Text>Loading...</Text>
  }

  return (
    <Container>
      <Title>
        {data.name}
      </Title>
      <Stack>

      {data.stats.map((stat) => ( <Progress key={stat.stat.name} value={stat.base_stat} />
    ))}
      </Stack>
      <Text>Id pokemon {pokemonId}</Text>
    </Container>
  );
};

export default SinglePokemon;
