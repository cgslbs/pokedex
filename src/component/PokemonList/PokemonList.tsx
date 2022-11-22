import { Container, Grid, Loader, Title, Flex, Box } from "@mantine/core";
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

  if (data === undefined) {
    return <Loader />;
  }

  return (
    <Grid>
      <ErrorBoundary fallback={<Title>erreur</Title>}>
        {data.map((pokemon) => (
          <Grid.Col span={4} key={pokemon.id}>
            <Suspense fallback={<Title>Loading</Title>}>
              <SingleCard pokemon={pokemon} />
            </Suspense>
          </Grid.Col>
        ))}
      </ErrorBoundary>
    </Grid>
  );
};

export default PokemonList;
