import { Hidden, ThemeProvider } from '@mui/material';
import React, { useState } from 'react';
import { MenuRounded } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import theme from '../../styles/theme';
import { AppBarBase, Circle, HeaderBase, Toolbar, Box, CircleText } from './header.styles';

type Props = {};

const MOBILE_WIDTH = 900;

const Header: React.FC<Props> = () => {
  const [state, setState] = useState({
    screeWidth: window.innerWidth,
    screenHeight: window.innerHeight,
  });
  const navigate = useNavigate();

  window.onresize = function () {
    setState({
      ...state,
      screeWidth: window.innerWidth,
      screenHeight: window.innerHeight,
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <HeaderBase>
        <AppBarBase color="primary">
          <Toolbar
            marginLeft={state.screeWidth >= MOBILE_WIDTH ? 6 : 0}
            marginRight={state.screeWidth >= MOBILE_WIDTH ? 6 : 0}
          >
            <Box>
              <MenuRounded color="primary" />
            </Box>

            <Box onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>
              <img src="https://www.indt.org.br/assets/img/logo/logo_new.png" height="50" />
            </Box>
          </Toolbar>
        </AppBarBase>
      </HeaderBase>
    </ThemeProvider>
  );
};

export default Header;
