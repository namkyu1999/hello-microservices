import { createTheme } from '@mui/material/styles';
import { green, purple, pink } from '@mui/material/colors';

export enum Theme {
    DARK = 'dark',
    LIGHT = 'light',
}

const lightTheme = createTheme({
    palette: {
        primary: {
            main: purple[500],
        },
        secondary: {
            main: green[500],
        },
    },
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: 'hsl(235, 24%, 19%)',
        },
        secondary: {
            main: pink[500],
        },
    },
});

const themes = {
    [Theme.DARK]: darkTheme,
    [Theme.LIGHT]: lightTheme,
};

export const getTheme = (theme: Theme) => {
    return themes[theme];
};
