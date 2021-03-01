import React from 'react';
import { FiPower, FiMoon, FiSun } from 'react-icons/fi';

import { useAuth } from '../../hooks/Auth';
import { useTheme } from '../../hooks/Theme';

import {
  ContainerDiv,
  ContainerHeader,
  SwitchTheme
} from './styles';

interface ContainerProrps {
  flex?: boolean;
}

const Container: React.FC<ContainerProrps> = ({ flex , children }) => {
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <ContainerDiv flex={flex}>
        <ContainerHeader>
          <SwitchTheme
            onChange={toggleTheme}
            checked={theme.title === 'dark'}
            checkedIcon={<FiSun style={{ marginTop: '3px', marginLeft: '3px', color: 'black' }}/>}
            uncheckedIcon={<FiMoon style={{ marginTop: '3px', marginLeft: '9px', color: 'white' }}/>}
            height={21}
            width={50}
            handleDiameter={21}
            onColor="#eaeaea"
            offColor="#323232"
          />
          { user != null &&
            <>
              <p>| {user.name} | </p>
              <button onClick={signOut}> Sair <FiPower size={15}/></button>
            </>
          }
        </ContainerHeader>

        {children}

      </ContainerDiv>
    </>
  );
};

export default Container;
