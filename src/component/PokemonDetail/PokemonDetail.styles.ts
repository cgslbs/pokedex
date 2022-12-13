import { createStyles } from "@mantine/core";

export const usesStyles = createStyles((theme)=> ({
    pokemonProfile: {
        "& h6": {
            textTransform: "uppercase",
        },
        "& img": {
            maxWidth: '75%',
            marginLeft: 'auto',
            marginRight: 'auto',
        }
    }
}))