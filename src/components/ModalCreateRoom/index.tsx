import React, { useState, useCallback, FormEvent } from 'react';
import Modal, { ModalProps as ModalPropsMaterial } from '@material-ui/core/Modal';
import { useHistory } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';

import api from '../../services/api';

import {
  ModalContainer,
  ModalTitle,
  ModalButton,
  ModalClose,
} from './styles';

interface ModalProps extends ModalPropsMaterial {
  handleClose(): void;
}

const Container: React.FC<ModalProps> = ({ handleClose ,...rest }) => {
  const history = useHistory();

  const [nameRoom, setNameRoom] = useState('');
  const [typeRoom, setTypeRoom] = useState('');
  const [maxUsers, setMaxUsers] = useState('');

  const handleCreateRoom = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if(nameRoom && typeRoom && maxUsers){
      const newRoom = {
        name: nameRoom,
        type: typeRoom,
        max_users: maxUsers,
      };

      try {
        const response = await api.post('/rooms', newRoom);

        if(response.data)
          history.push(`/room/${response.data.id}`);
      } catch (error) {

      }
    }
  }, [nameRoom, typeRoom, maxUsers, history]);

  return (
    <>
      <Modal
        onClose={handleClose}
        { ...rest}
      >
        {
          <ModalContainer>
            <ModalTitle>
              <h1>Nova Sala</h1>
              <ModalClose onClick={handleClose}/>
            </ModalTitle>
            <form onSubmit={handleCreateRoom}>
              <input
                value={nameRoom}
                onChange={(e) => setNameRoom(e.target.value)}
                placeholder="Nome da Sala"
              />
              <input
                value={typeRoom}
                onChange={(e) => setTypeRoom(e.target.value)}
                placeholder="Tipo"
              />
              <input
                type='number'
                value={maxUsers}
                onChange={(e) => setMaxUsers(e.target.value)}
                placeholder="Quatidade Maxima de Usuarios"
              />

              <ModalButton>Criar Sala <FiPlus size={20}/></ModalButton>
            </form>
          </ModalContainer>
        }
      </Modal>
    </>
  );
};

export default Container;
