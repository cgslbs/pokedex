import { Container, Grid, Loader, Title } from "@mantine/core";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import useSWR from "swr";
import { Pokemon } from "../../interfaces/interfaces";
import { fetchAllPokemon } from "../../service/pokemon";

const SingleCard = dynamic(
  async () => await (await import("./PokemonList.components")).SingleCard
);

const PokemonList = () => {
  const { data } = useSWR<Pokemon[]>("allPokemons", fetchAllPokemon, {
    suspense: true,
  });


  if(data === undefined) {
    return <Loader />;
  }

  return (
    <Container>
      <ErrorBoundary fallback={<Title>erreur</Title>}>
        <Title order={1}>Pokéflex</Title>
        <div>Header</div>
        <Grid gutter="md">
          {data.map((pokemon) => (
            <Grid.Col span={4} key={pokemon.id}>
              <Suspense fallback={<Title>Loading</Title>}>
                <SingleCard pokemon={pokemon} />
              </Suspense>
            </Grid.Col>
          ))}
        </Grid>
      </ErrorBoundary>
    </Container>
  );
};

export default PokemonList;
