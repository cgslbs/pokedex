import { MantineTheme } from "@mantine/core";
import { DEFAULT_THEME } from "@mantine/styles";

export const theme: MantineTheme = {
  ...DEFAULT_THEME,
  primaryColor: "blue",
  colorScheme: "light",
  colors: {
    ...DEFAULT_THEME.colors,
    sand: ['#F9EBDC', '#F5E2CC', '#F2D9BB', '#EECFAA', '#EAC69A', '#E7BD8B', '#E3B47C', '#DFA968', '#DDA560','#DBA057' ]
  }
};
