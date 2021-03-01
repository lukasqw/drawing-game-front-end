import styled, { css } from 'styled-components';
import Switch from 'react-switch';

interface Props {
  flex?: boolean;
}

export const ContainerDiv = styled.div<Props>`
  ${props =>
    props.flex &&
    css`
      display: flex;
      align-items: center;
      justify-content: center;
    `
  }

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

export const ContainerHeader = styled.div`
  position: absolute;
  top: -30px;
  width: calc(1100px - 90px);
  height: 30px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-weight: bold;

  button {
    font-weight: bold;
    border: none;
    background: transparent;
    margin-left: 5px;
    display: flex;
    align-items: center;
    svg {
      margin-left: 3px;
    }

    transition: 0.2s;
    &:hover {
      color: ${props => props.theme.colors.text };
    }
  }
`

export const SwitchTheme = styled(Switch)`
  margin-right: 10px;
`
