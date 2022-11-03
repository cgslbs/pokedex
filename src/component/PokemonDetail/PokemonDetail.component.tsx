import {
  Badge,
  Group,
  Stack,
  ThemeIcon,
  Title,
  Tooltip,
  Text,
} from "@mantine/core";
import {
  IconHeart,
  IconSword,
  IconShield,
  IconSwords,
  IconShieldLock,
  IconComet, IconEyeOff
} from "@tabler/icons";

import { Stat, Type, Ability } from "../../interfaces/interfaces";
import useSWR from 'swr';
import { PokemonAbility } from '../../interfaces/pokemonAbilities';
import { fetchAllAbilities } from "../../service/pokemon";
import PokemonTypeBadge from "../PokemonTypeBadge/PokemonTypeBadge";
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

export const PokemonAbilities = ({
  pokemonAbilities,
}: {
  pokemonAbilities: Ability[];
}) => {
    const {data} = useSWR<PokemonAbility[]>('allAbilities', () => fetchAllAbilities())

    console.log('abilities', data)
  return (
    <Stack>
      <Title order={6}>abilities</Title>
      <Group>
        {pokemonAbilities.map((ability) => (
          <Badge
            key={ability.ability.name}
            color={ability.is_hidden ? "dark" : "cyan"}
            variant="filled"
            leftSection={ability.is_hidden ? <IconEyeOff size="12" style={{marginTop: '5px'} } /> : ''}
          >
            {ability.ability.name}
          </Badge>
        ))}
      </Group>
    </Stack>
  );
};

export const PokemonTypes = ({ pokemonTypes }: { pokemonTypes: Type[] }) => {
  return (
    <Stack>
      <Title order={6}>types</Title>
      <Group>
        {pokemonTypes.map((type) => (
          <PokemonTypeBadge key={type.type.name} pokemonType={type} />
        ))}
      </Group>
    </Stack>
  );
};

export const PokemonStats = ({ pokemonStats }: { pokemonStats: Stat[] }) => {
  return (
    <Stack>
      <Title order={6}>Statistics</Title>
      <Group grow>
        {pokemonStats.map((stat) => {
          const Icon =
            ICON_STATS[
              stat.stat.name
                .toUpperCase()
                .replace("-", "_") as keyof typeof ICON_STATS
            ];

          return (
            <Tooltip key={stat.stat.name} label={stat.stat.name.toUpperCase()}>
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
                <Text size="xs" weight="bold">
                  {stat.base_stat}
                </Text>
              </Group>
            </Tooltip>
          );
        })}
      </Group>
    </Stack>
  );
};
