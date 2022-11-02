import {
  Title,
  Text,
  Container,
  Stack,
  Image,
  Grid,
  Group,
  Badge,
  Tooltip,
  ThemeIcon,
} from "@mantine/core";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Pokemon, Stat } from "../../interfaces/interfaces";
import { fetchPokemonById } from "../../service/pokemon";
import {
  IconHeart,
  IconSword,
  IconShield,
  IconSwords,
  IconShieldLock,
  IconComet,
} from "@tabler/icons";

const COLOR_STATS = {
  HP: "lime",
  ATTACK: "red",
  DEFENSE: "blue",
  SPECIAL_ATTACK: "orange",
  SPECIAL_DEFENSE: "teal",
  SPEED: "yellow",
};

const ICON_STATS = {
  HP: IconHeart,
  ATTACK: IconSword,
  DEFENSE: IconShield,
  SPECIAL_ATTACK: IconSwords,
  SPECIAL_DEFENSE: IconShieldLock,
  SPEED: IconComet,
};

const PokemonDetail = () => {
  const router = useRouter();
  const { pokemonId } = router.query;

  const { data } = useSWR<Pokemon>(["slug-pokemon", pokemonId], () =>
    fetchPokemonById(+(pokemonId as string))
  );

  if (typeof data === "undefined") {
    return <Text>Loading...</Text>;
  }

  return (
    <Container >
      <Title transform="capitalize">{data.name}</Title>
      <Grid justify="center" gutter="xl">
        <Grid.Col span={4}>
          <Stack align="center">
            <Image
              radius="md"
              src={data.sprites.other?.["official-artwork"].front_default}
              alt={data.name}
            />
            <Title order={6} align="center" transform="uppercase">
              abilities
            </Title>
            <Group>
              {data.abilities.map((ability) => (
                <Badge
                  key={ability.ability.name}
                  color={ability.is_hidden ? "dark" : "cyan"}
                >
                  {ability.ability.name}
                </Badge>
              ))}
            </Group>
          </Stack>
        </Grid.Col>
        <Grid.Col span={8}>
          <Title order={6} transform="uppercase">
            Statistics
          </Title>
          <Group>
          {data.stats.map((stat) => {
            const Icon =
              ICON_STATS[
                stat.stat.name
                  .toUpperCase()
                  .replace("-", "_") as keyof typeof ICON_STATS
              ];

            return (
              <Tooltip
                key={stat.stat.name}
                label={stat.stat.name.toUpperCase()}
              >
                <Group spacing="xs">
                  <ThemeIcon
                    variant="light"
                    color={
                      COLOR_STATS[
                        stat.stat.name
                          .toUpperCase()
                          .replace("-", "_") as keyof typeof COLOR_STATS
                      ]
                    }
                    radius="xl"
                    size="sm"
                  >
                    <Icon size="14px " />
                  </ThemeIcon>
                  <Text size="sm">{stat.base_stat}</Text>
                </Group>
              </Tooltip>
            );
          })}
          </Group>
          <Grid grow>
            <Grid.Col span={6}>
              <Stack align="center" spacing='xs'>
              <Title order={6} transform="uppercase">weight</Title>
              <Text>{data.weight}</Text>
              </Stack>
            </Grid.Col>
            <Grid.Col span={6}>
              <Stack align="center" spacing='xs'>
                <Title order={6} transform="uppercase">height</Title>
              <Text>{data.height}</Text>
              </Stack>
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default PokemonDetail;
