import {
  Container,
} from "@mantine/core";
import type { NextPage } from "next";
import PokemonMainView from "../component/PokemonMainView/PokemonMainView";


const Home: NextPage = () => {

  return (
    <Container p="xs">
      {/* <div>HEADER</div> */}
      <PokemonMainView />
    </Container>
  );
};

export default Home;
