import { Grid, Loader, Title, Button, Box, Center } from "@mantine/core";
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

  const getKey = (_limitNumber: number, previousPageData: Pokemon[] | null) => {
    if (previousPageData && previousPageData.length === 0) return null;
    return `limit=30&offset=${offsetPokemon}`;
  };

  const { data, size, setSize } = useSWRInfinite<Pokemon[]>(
    getKey,
    fetchAllPokemon,
    {
      suspense: true,
    }
  );

  const fetchData = () => {
    setOffsetPokemon(offsetPokemon + 30);
    setSize(size + 1);
  };

  const listPokemon = useMemo(
    () => data?.reduce((prev, nextPokemon) => {
      return prev.concat(nextPokemon);
    }),  [data]);

  useEffect(() => {
    console.log("List changes", listPokemon);
  }, [listPokemon]);

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
              <SingleCard pokemon={pokemon} />
            </Grid.Col>
          ))}
      </Grid>
    </InfiniteScroll>
  );
};

export default PokemonList;
