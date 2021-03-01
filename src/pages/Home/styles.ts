import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

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

export const Title = styled.div`
  font-size: 150px;
  align-items: center;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    height: 380px;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

export const Input = styled.form`
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
