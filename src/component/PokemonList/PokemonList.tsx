import { Grid, Loader, Title, Button } from "@mantine/core";
import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import useSWRInfinite from "swr/infinite";

import { Pokemon } from "../../interfaces/interfaces";
import { fetchAllPokemon } from "../../service/pokemon";

const SingleCard = dynamic(
  async () => await (await import("./PokemonList.components")).SingleCard
);

const PokemonList = () => {
  const [offsetPokemon, setOffsetPokemon] = useState(0);
  const [isInit, setIsInit] = useState(false);
  const [currentPokemonList, setCurrentPokemonList] = useState<Pokemon[]>([]);

  let allPokemon : Pokemon[] = []

  const getKey = (_limitNumber: number, previousPageData: Pokemon[] | null) => {
    if (previousPageData && previousPageData.length === 0) return null;
    return `limit=20&offset=${offsetPokemon}`;
  };

  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite<
    Pokemon[]
  >(getKey, fetchAllPokemon, {
    suspense: true,
  });

  useEffect(() => {
    if (data === undefined) return;
    const newValue = allPokemon.concat(data[0]);
    allPokemon = newValue
    console.log(newValue)
    // setCurrentPokemonList(newValue)
    setIsInit(true);
  }, [data]);

  if (data === undefined || allPokemon.length === 0) {
    return <Loader />;
  }

  return (
    <Grid>
      <ErrorBoundary fallback={<Title>erreur</Title>}>
        {allPokemon.map((pokemon) => (
          <Grid.Col span={4} key={pokemon.id}>
            <Suspense fallback={<Title>Loading</Title>}>
              <SingleCard pokemon={pokemon} />
            </Suspense>
          </Grid.Col>
        ))}
        <Button
          onClick={() => {
            setOffsetPokemon(offsetPokemon + 20);
            setSize(size + 1);
          }}
        >
          Load More...
        </Button>
      </ErrorBoundary>
    </Grid>
  );
};

export default PokemonList;
