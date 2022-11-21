import { Container, Grid, Text, Title } from "@mantine/core";
import type { NextPage } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { ErrorBoundary } from "react-error-boundary";

const PokemonList = dynamic(
  async () => await import("../component/PokemonList/PokemonList")
);

const Home: NextPage = () => {
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
          <Text> Selected Pokemon data here</Text>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default Home;
