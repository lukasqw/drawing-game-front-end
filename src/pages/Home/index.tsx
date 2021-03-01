import React, { useState, FormEvent, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../../hooks/Auth';
import { useTheme } from '../../hooks/Theme';

import Container from '../../components/Container';

import logoWhite from '../../assets/logo-white.svg';
import logoDark from '../../assets/logo-dark.svg';

import {
  Title,
  InputContainer,
  Input
} from './styles';

const Home: React.FC = () => {
  const history = useHistory();
  const { user, signIn } = useAuth();
  const { theme } = useTheme();
  const [userName, setUserName] = useState(user?.name);

  const Play = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if(userName){
      await signIn({
        name: userName
      });

      history.push('/room');
    }
  }, [userName, signIn, history]);

  return (
    <>
      <Container>
        <Title>
            { theme.title == 'dark' ? <img src={logoWhite} alt="Drawing Game"/> : <img src={logoDark} alt="Drawing Game"/> }

        </Title>
        <InputContainer>
          <Input onSubmit={Play}>
            <input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Nome do Usuario"
            />
            <button type="submit">Jogar</button>
          </Input>
        </InputContainer>
      </Container>
    </>
  );
};

export default Home;
