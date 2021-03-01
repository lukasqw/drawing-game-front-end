import styled from 'styled-components';
import { shade } from 'polished';

export const ContainerNotFound = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    margin-right: 20px;
  }

  p {
    font-size: 40px;
    text-shadow: 3px 3px 5px ${props => props.theme.colors.shadow };
  }

  button {
    margin-top: 20px;
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
  }
`;
