import { Title, Text, Container } from "@mantine/core";
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
  console.log(pokemonId);
  return (
    <Container>
      <Title>
        This is Single Pokemon page you know, do the detail view b*tch
      </Title>
      <Text>Id pokemon {pokemonId}</Text>
    </Container>
  );
};

export default SinglePokemon;
