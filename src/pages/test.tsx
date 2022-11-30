import { Container, Text, Loader, Center, Grid } from "@mantine/core";
import { NextPage } from "next";
import { Suspense, useMemo, useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { SingleCard } from "../component/PokemonList/PokemonList.components";
import { Pokemon } from "../interfaces/interfaces";
import { fetchAllPokemon } from "../service/pokemon";
import useSWRInfinite from "swr/infinite";
import PokemonList from "../component/PokemonList/PokemonList";
import { ErrorBoundary } from "react-error-boundary";

const TestInfiniteScroll: NextPage = () => {
  const [offsetPokemon, setOffsetPokemon] = useState(0);

  const [previousPageData, setPreviousPageData] = useState<Pokemon[]>([]);

  const getKey = (_limitNumber: number, previous: Pokemon[] | null) => {
    if (!!previous && previous.length === 0) {
      return null;
    }

    return `limit=30&offset=${offsetPokemon}`;
  };

  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
    getKey,
    fetchAllPokemon,
    {
      suspense: true,
    }
  );

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
    <Container>
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
          {!!listPokemon &&
            listPokemon.map((pokemon) => (
              <Grid.Col span={4} key={`${pokemon.id}_${pokemon.name}`}>
                <SingleCard pokemon={pokemon} />
              </Grid.Col>
            ))}
        </Grid>
      </InfiniteScroll>
    </Container>
  );
};

export default TestInfiniteScroll;
