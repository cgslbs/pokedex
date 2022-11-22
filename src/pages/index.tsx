import { Container, Grid, Text, Title } from "@mantine/core";
import type { NextPage } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { ErrorBoundary } from "react-error-boundary";
import { selectedPokemonAtom } from "../states/selectedPokemon.states";
import PokemonDetail from "../component/PokemonDetail/PokemonDetail";
import { useAtom } from "jotai";

const PokemonList = dynamic(
  async () => await import("../component/PokemonList/PokemonList")
);

const Home: NextPage = () => {

  const [currentPokemon, updateCurrentPokemon] = useAtom(selectedPokemonAtom)
  
  return (
    <Container py="xs" >
    <Title order={1}>Pokéflex</Title>
    <div>Header</div>
      <Grid>
        <Grid.Col
          span={8}
          style={{ height: "90vh", overflowY: "scroll", overflowX: "hidden" }}
        >
          <ErrorBoundary fallback={<Text>Error</Text>}>
            <Suspense fallback={<Text>Loading page...</Text>}>
              <PokemonList />
            </Suspense>
          </ErrorBoundary>
        </Grid.Col>
        <Grid.Col span={4}>
        <ErrorBoundary fallback={<Text>Error</Text>}>
            <Suspense fallback={<Text>Loading page...</Text>}>
              <PokemonDetail pokemonId={currentPokemon !== null ? currentPokemon.id : 1} />
            </Suspense>
          </ErrorBoundary>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default Home;
