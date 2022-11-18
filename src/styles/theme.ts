import { MantineTheme } from "@mantine/core";
import { DEFAULT_THEME } from "@mantine/styles";

export const theme: MantineTheme = {
  ...DEFAULT_THEME,
  primaryColor: "blue",
  colorScheme: "light",
  colors: {
    ...DEFAULT_THEME.colors,
    rock: [
      "#EFECE6",
      "#E2DED7",
      "#D5D0C7",
      "#C9C2B8",
      "#BCB4A8",
      "#AFA599",
      "#A29789",
      "#96897A",
      "#897B6A",
      "#7C6D5B",
    ],
    sand: [
      "#F9EBDC",
      "#F5E2CC",
      "#F2D9BB",
      "#EECFAA",
      "#EAC69A",
      "#E7BD8B",
      "#E3B47C",
      "#DFA968",
      "#DDA560",
      "#DBA057",
    ],
    corail: [
      "#FFF3F0",
      "#FEE7EA",
      "#FDDBE3",
      "#FBCFDD",
      "#FAC3D6",
      "#F9B7D0",
      "#f8abc9",
      "#F69FC3",
      "#F593BC",
      "#F487B6",
    ],
    dragon: [
      "#A9D6E5",
      "#89C2D9",
      "#61A5C2",
      "#468FAF",
      "#2C7DA0",
      "#2a6f97",
      "#165F8F",
      "#014F86",
      "#01497C",
      "#013A63",
    ],
    steel: [
      "#E4E5E7",
      "#C9CCD0",
      "#ADB2B8",
      "#9298A0",
      "#777F89",
      "#6A727D",
      "#5C6571",
      "#404B59",
      "#253242",
      "#0A182A",
    ],
    dark: [
      "#F2F3F4",
      "#E5E6E9",
      "#CBCCD2",
      "#9698A5",
      "#626478",
      "#2D304A",
      "#222438",
      "#171825",
      "#12121C",
      "#0C0C13",
    ],
    unknown: [
      "#FCFCFB",
      "#F2F0ED",
      "#E5E1DA",
      "#D8D2C8",
      "#CAC2B5",
      "#BEB6AA",
      "#B1AA9F",
      "#989288",
      "#7F7A72",
      "#65615B",
    ],
    shadow: [
      "#F4F4F6",
      "#E4E2E8",
      "#C8C4D0",
      "#9088A0",
      "#756A88",
      "#594C70",
      "#3D2E58",
      "#2F1F4C",
      "#211040",
      "#1D0E38",
    ]
  },
};
