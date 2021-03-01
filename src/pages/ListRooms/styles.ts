import styled from 'styled-components';
import GridList from '@material-ui/core/GridList';
import { shade } from 'polished';

export const Container = styled.div`
  background: ${props => props.theme.colors.background };
  border-radius : 50px;

  width: calc(1100px - 90px);
  height: calc(550px - 90px);
  padding: 45px;

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  /* Shadowns */
  -webkit-box-shadow: 3px 3px 15px 0px rgba(0,0,0,0.4);
  -moz-box-shadow: 3px 3px 15px 0px rgba(0,0,0,0.4);
  box-shadow: 3px 3px 15px 0px rgba(0,0,0,0.4);
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const InputSearch = styled.form`
  input {
    border: 1px solid ${props => props.theme.colors.border };
    background-color: ${props => props.theme.colors.backgroundSecondary };
    padding: 10px;
    border-radius: 10px 0px 0px 10px;

    color: ${props => props.theme.colors.primary };

    &::placeholder {
      color: ${props => shade(0.2, props.theme.colors.primary) };
    }
  }

  button {
    padding: 11px;
    border: none;
    border-radius: 0px 10px 10px 0px;
    background: linear-gradient(45deg, ${props => props.theme.colors.gradient.primary } 0%, ${props => props.theme.colors.gradient.secondary } 100%);

    &:hover {
      background: linear-gradient(45deg, ${props => shade(0.2, props.theme.colors.gradient.primary) } 0%, ${props => shade(0.2, props.theme.colors.gradient.secondary) } 100%);
    }
  }

  /* Shadowns */
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  -webkit-box-shadow: 3px 3px 15px 0px ${props => props.theme.colors.shadow };
  -moz-box-shadow: 3px 3px 15px 0px ${props => props.theme.colors.shadow };
  box-shadow: 3px 3px 15px 0px ${props => props.theme.colors.shadow };
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  font-weight: bold;
  padding: 10px;
  border-radius: 10px;
  border: none;
  background: linear-gradient(45deg, ${props => props.theme.colors.gradient.primary } 0%, ${props => props.theme.colors.gradient.secondary } 100%);
  transition: 0.2s;

  svg {
    margin-left: 5px;
  }

  &:hover {
    background: linear-gradient(45deg, ${props => props.theme.colors.primary } 0%, ${props => props.theme.colors.secondary } 100%);
  }

  /* Shadowns */
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  -webkit-box-shadow: 3px 3px 15px 0px ${props => props.theme.colors.shadow };
  -moz-box-shadow: 3px 3px 15px 0px ${props => props.theme.colors.shadow };
  box-shadow: 3px 3px 15px 0px ${props => props.theme.colors.shadow };
`;

export const Grid = styled(GridList)`
  margin-top: 20px !important;
  max-height: 90%;

  a {
    text-decoration: none;
  }

  &::-webkit-scrollbar {
    width: 0.5em;
    border-radius: 50%;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px ${props => props.theme.colors.shadow };
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${props => props.theme.colors.backgroundSecondary };
    outline: 1px solid ${props => props.theme.colors.backgroundSecondary };
    border-radius: 10px;
  }
`;

export const Room = styled.div`
  height: 95%;
  width: 98%;
  background-color: ${props => props.theme.colors.backgroundSecondary };
  border-radius: 10px;
  border: 1px solid ${props => props.theme.colors.border };
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${props => props.theme.colors.secondary };

  transition: 0.2s;

  strong {
    margin-left: 5px;
    font-size: 20px;
  }

  p {
    display: flex;
    align-items: center;
    margin-right: 10px;
    font-size: 15px;

    svg {
      margin-right: 5px;
    }
  }


  &:hover {
    border: 1px solid ${props => props.theme.colors.secondary };
  }

`;

export const IconRoom = styled.div`
  margin-left: 5px;
  height: 60px;
  width: 60px;
  background-color: ${props => props.theme.colors.background };
  border-radius: 50%;
  position: relative;
  font-size: 50px;
  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    align-items: center;
    fill: url(#my-cool-gradient);
  }
`;

export const SvgGradientes = styled.svg`
  width:0;
  height:0;
  position:absolute;
`;
