import styled from 'styled-components';
import InputColor from 'react-input-color';
import Slider from '@material-ui/core/Slider';
import { shade } from 'polished'

export const DrawArea = styled.canvas`
  background: white;
  border: 3px solid ${props => props.theme.colors.border };
  border-radius: 20px;

  /* Shadowns */
  -webkit-box-shadow: 3px 3px 15px 0px ${props => props.theme.colors.shadow };
  -moz-box-shadow: 3px 3px 15px 0px ${props => props.theme.colors.shadow };
  box-shadow: 3px 3px 15px 0px ${props => props.theme.colors.shadow };
`;

export const ToolBar = styled.div`
  background: ${props => props.theme.colors.backgroundSecondary };
  border-radius: 20px;

  width: 250px;
  height: -webkit-fill-available;
  padding: 20px;
  margin-right: 20px;

  /* Shadowns */
  -webkit-box-shadow: 3px 3px 15px 0px ${props => props.theme.colors.shadow };
  -moz-box-shadow: 3px 3px 15px 0px ${props => props.theme.colors.shadow };
  box-shadow: 3px 3px 15px 0px ${props => props.theme.colors.shadow };
`

export const InputViewColor = styled(InputColor)`
  width: 100% !important;
  height: 35px !important;
  margin-bottom: 15px !important;
  border: none !important;
  background-color: ${props => props.theme.colors.background } !important;
  padding: 3px !important;
  border-radius: 9px !important;

  span {
    border-radius: 5px;
  }
`

export const SliderSize = styled(Slider)`
  color: ${props => props.theme.colors.secondary } !important;
  padding: 25px 0 !important;

  .MuiSlider-rail {
    height: 5px;
    border-radius: 5px;
  }

  .MuiSlider-track {
    height: 5px;
    border-radius: 5px;
  }

  .MuiSlider-thumb {
    height: 15px !important;
    width: 15px !important;

    &:hover {
      box-shadow: 0px 0px 0px 8px ${props => shade(0.3, props.theme.colors.secondary) };
    }
  }
`

export const BtnClearDrawArea = styled.button`
  border: none;
  background: transparent;
  position: absolute;
  top: 55px;
  right: 55px;
  cursor: pointer;
  opacity: 0.5;
  transition: 0.2s;

  &:hover {
    opacity: 1;
  }
`;

interface ChatProps {
  isDraw: boolean;
}

export const Chat = styled.div<ChatProps>`
  height: ${props => props.isDraw ? '200px': '420px'};
  width: -webkit-fill-available;
  background-color: ${props => shade(0.07, props.theme.colors.backgroundSecondary) };
  border-radius: 10px 10px 0 0;

  div:first-child {
    height: ${props => props.isDraw ? '81%': '90%'};
    width: -webkit-fill-available;
    padding: 5px;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      width: 0.5em;
      height: 0.5em;
      border-radius: 50%;
    }

    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${props => props.theme.colors.background };
      outline: 1px solid ${props => props.theme.colors.background };
      border-radius: 10px;
    }

    &::-webkit-scrollbar-corner {
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }
    p {
      width:100%;

      strong {
      color: ${props => props.theme.colors.secondary };
    }
    }
  }
`;

export const InputMessage = styled.form`
  display: flex;
  align-items: center;
  border-bottom: 2px solid #1f1f1f;

  input {
    width: 85%;
    background: transparent;
    border: none;
    padding-left: 5px;
    color: ${props => props.theme.colors.text };

    &::placeholder {
      color: #1f1f1f;
    }
  }

  button {
    background: transparent;
    border: none;
    color: #1f1f1f;
  }

  transition: 0.2s;

  &:hover {
    border-bottom: 2px solid #000;
    button {
      color: #000;
    }
  }
`

export const WordFind = styled.div`
  position: absolute;
  top: 60px;
  left: 330px;
  width: 720px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 5px;
`;

interface TimerBarProps {
  timePercent: number;
}

export const TimerBar = styled.div<TimerBarProps>`
  position: absolute;
  width: 690px;
  height: 11px;
  border-radius: 10px;
  bottom: 55px;
  left: 350px;
  background: ${props => props.theme.colors.backgroundSecondary };

  display: flex;
  align-items: center;

  div {
    width: ${props => (props.timePercent + '%') };
    height: 5px;
    background: linear-gradient(70deg, ${props => props.theme.colors.gradient.primary } 0%, ${props => props.theme.colors.gradient.secondary } 100%);
    border-radius: 5px;
    margin-left: 5px;
    margin-right: 5px;
    transition: 0.2s;
  }
`;
