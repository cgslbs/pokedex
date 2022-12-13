import {
  AppShell,
  Aside,
  Center,
  Container,
  Dialog,
  Grid,
  Group,
  Header,
  Loader,
  Text,
} from "@mantine/core";
import { useAtom } from "jotai";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { selectedPokemonAtom } from "../../states/selectedPokemon.states";
import { openedDialog } from "../../states/openedDialog.states";

const PokemonList = dynamic(
  async () => await import("../../component/PokemonList/PokemonList")
);

const PokemonDetail = dynamic(
  async () => await import("../../component/PokemonDetail/PokemonDetail")
);

const PokemonMainView = () => {
  const [currentPokemon, _updateCurrentPokemon] = useAtom(selectedPokemonAtom);
  const [isOpened, _updateIsOpened] = useAtom(openedDialog);

  return (
    <>
      <Dialog position={{top: '2%', right: '20%'}} shadow="xs" opened={isOpened} size="lg" radius="md" withBorder={false}>
        <ErrorBoundary fallback={<Text>Error</Text>}>
          <Suspense
            fallback={
              <Center>
                <Loader />
              </Center>
            }
          >
            <PokemonDetail pokemonId={currentPokemon ? currentPokemon.id : 0} />
          </Suspense>
        </ErrorBoundary>
      </Dialog>
      <Grid>
        <Grid.Col span={8}>
          <ErrorBoundary fallback={<Text>Error</Text>}>
            <Suspense
              fallback={
                <Center>
                  <Loader />
                </Center>
              }
            >
              <PokemonList />
            </Suspense>
          </ErrorBoundary>
        </Grid.Col>
        <Grid.Col span={4}>
          {/* Left empty to allow space for the dialog modal of pokemon Detail */}
        </Grid.Col>
      </Grid>
    </>
  );
};

export default PokemonMainView;
