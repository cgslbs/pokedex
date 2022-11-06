import { Text } from "@mantine/core";
import type { NextPage } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { ErrorBoundary } from "react-error-boundary";

const PokemonList = dynamic(
  async () => await import("../component/PokemonList/PokemonList")
);

const Home: NextPage = () => {
  return (
    <div>
      <ErrorBoundary fallback={<Text>Error</Text>}>
        <Suspense fallback={<Text>Loading page...</Text>}>
          <PokemonList />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default Home;
