import { AppBar, styled, Toolbar as ToolbarBase, Box as BoxBase } from '@mui/material';
import colors from '../../styles/colors';

export const AppBarBase = styled(AppBar)`
  display: flex;
  justify-content: center;
`;
export const HeaderBase = styled('header')`
  display: flex;
  justify-content: center;
`;
interface ToolbarProps {
  marginLeft: number;
  marginRight: number;
}

export const Toolbar = styled(ToolbarBase)<ToolbarProps>`
  display: flex;
  justify-content: center;
  margin-left: ${(props) => `${props.marginLeft}rem`};
  margin-right: ${(props) => `${props.marginRight}rem`};
`;
export const Box = styled(BoxBase)`
  display: flex;
  align-items: center;
`;

export const Circle = styled('div')`
  background: ${colors.primary};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  line-height: 30px;
  margin-left: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CircleText = styled('p')`
  font-weight: 500;
  font-size: 16px;
  color: ${colors.secundary};
  margin-top: 1rem;
`;
