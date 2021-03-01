import React from 'react';
import Container from '../../components/Container';
import { Link } from 'react-router-dom';
import { FaRegSadTear } from 'react-icons/fa';

import { ContainerNotFound } from './styles';

const NotFound: React.FC = () => {

  return (
    <>
      <Container flex={true}>
        <ContainerNotFound>
          <FaRegSadTear size={200}/>
          <div>
            <p>Page Not Found</p>
            <Link to="/room">
              <button>Go to Home</button>
            </Link>
          </div>
        </ContainerNotFound>
      </Container>
    </>
  );
}

export default NotFound;
