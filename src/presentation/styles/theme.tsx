import { createTheme } from '@mui/material';

declare module '@mui/material/styles' {
  interface PaletteOptions {
    neutral: PaletteOptions['primary'];
    danger: PaletteOptions['primary'];
    disabled: PaletteOptions['primary'];
  }
  interface PaletteColorOptions {
    main: string;
    light: string;
    dark: string;
    lighther?: string;
  }
}

const theme = createTheme({
  palette: {
    secondary: {
      main: '#004B50',
      dark: '#0b2324',
      light: '#03686f',
    },
    primary: {
      main: '#05B2D0',
      dark: '#036E7A',
      light: '#9CE8F5',
    },
    neutral: {
      main: '#B2B2B2',
      dark: '#C4C4C4',
      light: '#EDEDED',
    },
    danger: {
      main: '#FA6159',
      dark: '#E05851',
      light: '#F18F93',
      lighther: '#F5B7C1',
    },
    disabled: {
      main: '#D4D4D4',
      dark: '#666666',
      light: '#CCC',
    },
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
});

export default theme;
