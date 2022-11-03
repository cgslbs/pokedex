import {
  Text,
  Container,
} from "@mantine/core";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const PokemonDetail = dynamic(
  async () => await import("../../component/PokemonDetail/PokemonDetail"),
  { suspense: true }
);

const PokemonProfile = () => {
  const router = useRouter();
  const { pokemonId } = router.query;

  return (
    <Container>
      <ErrorBoundary fallback={<Text>Error has occured</Text>}>
        <Suspense fallback={<Text>Loading...</Text>}>
          <PokemonDetail pokemonId={+(pokemonId as string)} />
        </Suspense>
      </ErrorBoundary>
    </Container>
  );
};

export default PokemonProfile;
