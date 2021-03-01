import React, { useState, useEffect, FormEvent, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiPlus, FiUsers } from 'react-icons/fi';
import { GiGamepad } from "react-icons/gi";
import GridListTile from '@material-ui/core/GridListTile';

import api from '../../services/api';

import Container from '../../components/Container';
import ModalCreateRoom from '../../components/ModalCreateRoom'

import {
  Header,
  InputSearch,
  Button,
  Grid,
  Room,
  IconRoom,
  SvgGradientes,
} from './styles';

interface Room {
  id: string;
  name: string;
  type: string;
  qty_user: number;
  max_users: number;
}

const ListRooms: React.FC = () => {
  const [searchRoom, setSearchRoom] = useState('');
  const [rooms, setRooms] = useState<Room[]>([])

  // Modal
  const [open, setOpen] = React.useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const findRooms = useCallback(async (name: string) => {
    try {
      const response = await api.get(`/rooms/${name}`)

      setRooms(response.data);

      setSearchRoom('');
    } catch (error) {
      setRooms([]);
    }
  }, []);

  const handleSearchRoom = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    findRooms(searchRoom);
  }, [searchRoom, findRooms]);

  useEffect(() => {
    findRooms('');
  }, [findRooms]);

  return (
    <>
      <Container>
        <Header>
          <InputSearch onSubmit={handleSearchRoom}>
            <input
              value={searchRoom}
              onChange={(e) => setSearchRoom(e.target.value)}
              placeholder="Pesquisar Salas"
            />
            <button><FiSearch/></button>
          </InputSearch>
          <Button onClick={handleOpen}>Criar Sala <FiPlus size={20}/></Button>
        </Header>
        <Grid cellHeight={80} spacing={20} cols={4}>
          {rooms.map((room) => (
            <GridListTile key={room.id} cols={1}>
              <Link
                key={room.id}
                to={`/room/${room.id}`}>
                <Room>
                  <IconRoom>
                    <GiGamepad/>
                  </IconRoom>
                    <strong>{room.name}</strong>
                    <p><FiUsers/> {room.qty_user}/{room.max_users}</p>
                </Room>
              </Link>
            </GridListTile>
          ))}
        </Grid>

        <SvgGradientes aria-hidden="true" focusable="false">
          <linearGradient id="my-cool-gradient" x2="1" y2="1" gradientTransform="rotate(70)">
            <stop offset="0%" stop-color="#FF9000" />
            <stop offset="50%" stop-color="#FF1E56" />
            <stop offset="100%" stop-color="#FF1E56" />
          </linearGradient>
        </SvgGradientes>
      </Container>

      <ModalCreateRoom
        open={open}
        handleClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >{}</ModalCreateRoom>
    </>
  );
};

export default ListRooms;
