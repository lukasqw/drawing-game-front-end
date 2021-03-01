import styled from 'styled-components';
import { shade } from 'polished';

export const ModalContainer = styled.div`
  background: ${props => props.theme.colors.background };
  border-radius: 20px;
  border: 3px solid ${props => props.theme.colors.secondary };
  width: 50%;
  max-width: 300px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;

  h1 {
    /* Shadowns */
    text-shadow: 3px 3px 10px ${props => props.theme.colors.shadow };
  }

  input {
    border: 1px solid ${props => props.theme.colors.border };
    background-color: ${props => props.theme.colors.backgroundSecondary };
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 10px;
    width: 93%;

    color: ${props => props.theme.colors.text };

    &::placeholder {
      color: ${props => shade(0.2, props.theme.colors.primary) };
    }

    /* Shadowns */
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    -webkit-box-shadow: 3px 3px 15px 0px ${props => props.theme.colors.shadow };
    -moz-box-shadow: 3px 3px 15px 0px ${props => props.theme.colors.shadow };
    box-shadow: 3px 3px 15px 0px ${props => props.theme.colors.shadow };
  }
`;

export const ModalTitle = styled.div`
  display: flex;
  margin-bottom: 20px;
  color: ${props => props.theme.colors.secondary };
`;

export const ModalButton = styled.button`
  display: flex;
  width: 100%;
  margin-top: 10px;
  justify-content: center;
  align-items: center;

  font-weight: bold;
  padding: 10px;
  border: none;
  border-radius: 10px;
  background: linear-gradient(45deg, ${props => props.theme.colors.gradient.primary } 0%, ${props => props.theme.colors.gradient.secondary } 100%);
  transition: 0.2s;

  svg {
    margin-left: 5px;
  }

  &:hover {
    background: linear-gradient(45deg, ${props => shade(0.2, props.theme.colors.gradient.primary) } 0%, ${props => shade(0.2, props.theme.colors.gradient.secondary) } 100%);
  }

  /* Shadowns */
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  -webkit-box-shadow: 3px 3px 15px 0px ${props => props.theme.colors.shadow };
  -moz-box-shadow: 3px 3px 15px 0px ${props => props.theme.colors.shadow };
  box-shadow: 3px 3px 15px 0px ${props => props.theme.colors.shadow };
`

export const ModalClose = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  width: 32px;
  position: relative;
  align-items: center;
  top: -30px;
  right: calc(-56% + 25px);
  cursor: pointer;


  &::before,
  &::after {
    content: ' ';
    position: absolute;
    width: 2px;
    height: 16px;
    background-color: #000;
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }
`
