import {
  Grid,
  Loader,
  Text,
  Center,
  Skeleton,
} from "@mantine/core";
import dynamic from "next/dynamic";
import { Suspense, useEffect, useMemo, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import useSWRInfinite from "swr/infinite";
import InfiniteScroll from "react-infinite-scroll-component";

import { Pokemon } from "../../interfaces/interfaces";
import { fetchAllPokemon } from "../../service/pokemon";

const SingleCard = dynamic(
  async () => await (await import("./PokemonList.components")).SingleCard
);

const PokemonList = () => {
  const [offsetPokemon, setOffsetPokemon] = useState(0);

  const [previousPageData, setPreviousPageData] = useState<Pokemon[]>([]);

  const getKey = (_limitNumber: number, previous: Pokemon[] | null) => {
    if (!!previous && previous.length === 0) {
      return null;
    }

    return `limit=30&offset=${offsetPokemon}`;
  };

  const { data, size, setSize } = useSWRInfinite(getKey, fetchAllPokemon, {
    suspense: true,
  });

  const fetchData = () => {
    setOffsetPokemon(offsetPokemon + 30);
    setSize(size + 1);
    if (!!data) {
      setPreviousPageData((oldState) => [...oldState, ...data.flat()]);
    }
  };

  const listPokemon = useMemo(() => {
    if (!data) {
      return [];
    }
    const flatten = data.flat();
    return [...previousPageData, ...flatten];
  }, [data, data?.length, previousPageData, previousPageData.length]);

  return (
    <InfiniteScroll
      dataLength={listPokemon ? listPokemon.length : 0}
      next={fetchData}
      hasMore={true}
      loader={
        <Center>
          <Loader />
        </Center>
      }
    >
      <Grid>
        {listPokemon &&
          listPokemon.map((pokemon) => (
            <Grid.Col span={4} key={pokemon.id}>
              <ErrorBoundary fallback={<Text>Error</Text>}>
                <Suspense
                  fallback={<Skeleton height={100} width={100} radius="md" />}
                >
                  <SingleCard pokemon={pokemon} />
                </Suspense>
              </ErrorBoundary>
            </Grid.Col>
          ))}
      </Grid>
    </InfiniteScroll>
  );
};

export default PokemonList;
