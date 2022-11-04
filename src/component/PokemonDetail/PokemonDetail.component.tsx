import {
  Badge,
  Group,
  Stack,
  ThemeIcon,
  Title,
  Tooltip,
  Text,
  HoverCard,
} from "@mantine/core";
import {
  IconHeart,
  IconSword,
  IconShield,
  IconSwords,
  IconShieldLock,
  IconComet,
  IconEyeOff,
  IconMultiplier2x,
} from "@tabler/icons";

import { Stat, Type, Ability } from "../../interfaces/interfaces";
import useSWR from "swr";
import { PokemonAbility } from "../../interfaces/pokemonAbilities";
import {
  fetchAllPokemonAbilities,
  fetchPokemonType,
} from "../../service/pokemon";
import PokemonTypeBadge from "../PokemonTypeBadge/PokemonTypeBadge";
import { PokemonType } from "../../interfaces/pokemonType";
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
  const { data } = useSWR<PokemonAbility[]>(
    ["allAbilities", pokemonAbilities],
    () => fetchAllPokemonAbilities(pokemonAbilities)
  );

  return (
    <Stack>
      <Title order={6}>abilities</Title>
      <Group>
        {pokemonAbilities.map((ability) => {
          const abilityDescritption = data
            ?.find((T) => T.name === ability.ability.name)
            ?.effect_entries.find((entry) => entry.language.name === "en");
          return (
            <HoverCard key={ability.ability.name} width={250} shadow="sm">
              <HoverCard.Target>
                <Badge
                  color={ability.is_hidden ? "dark" : "cyan"}
                  variant="filled"
                  leftSection={
                    ability.is_hidden ? (
                      <IconEyeOff size="12" style={{ marginTop: "5px" }} />
                    ) : (
                      ""
                    )
                  }
                >
                  {ability.ability.name}
                </Badge>
              </HoverCard.Target>
              <HoverCard.Dropdown>
                <Text size="sm">{abilityDescritption?.effect}</Text>
              </HoverCard.Dropdown>
            </HoverCard>
          );
        })}
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
          <PokemonTypeBadge key={type.type.name} pokemonType={type.type.name} />
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

export const PokemonDamages = ({ pokemonTypes }: { pokemonTypes: Type[] }) => {
  const { data } = useSWR<PokemonType[]>(["allTypes", pokemonTypes], () =>
    fetchPokemonType(pokemonTypes)
  );
  console.log("data", data);

  return (
    <Stack>
      <Title order={6}>damages</Title>
        {pokemonTypes.map((type) => {
          const damageByType = data?.find((T) => T.name === type.type.name);
          return (
            <Group key={type.type.name}>
              <PokemonTypeBadge key={type.type.name} pokemonType={type.type.name} />
              <ThemeIcon radius="xl" size="md">
                <IconMultiplier2x size={20} />
              </ThemeIcon>
              {damageByType?.damage_relations.double_damage_from.map((T) => {return (
                <PokemonTypeBadge key={T.name} pokemonType={T.name} />
              )})}
            </Group>
          );
        })}
    </Stack>
  );
};
