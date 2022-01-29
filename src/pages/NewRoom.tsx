import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';
import { getDatabase, ref, push } from "firebase/database";

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import '../styles/auth.scss';

import { Button } from '../components/Button';

export function NewRoom() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [roomName, setRoomName] = useState('');

  async function createRoom(event:FormEvent) {
    event.preventDefault();
    
    const roomTitle = roomName.trim();

    if (roomTitle === '') return;

    const roomRef = ref(getDatabase(), 'rooms');

    const resultRoom = await push(roomRef, {
      title: roomTitle,
      userId: user?.id
    });

    navigate(`/admin/rooms/${resultRoom.key}`);
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas"/>
        <strong>Toda pergunta tem uma resposta.</strong>
        <p>Aprenda e compartilhe conhecimento com outras pessoas</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask"/>
          <h2>Criar uma nova sala</h2>
          <form onSubmit={createRoom}>
            <input 
              type="text" 
              placeholder="Nome da sala"
              onChange={event => setRoomName(event.target.value)}
              value={roomName}
            />
            <Button raised primary type="submit">
              Criar sala
            </Button>
            <p>Quer entrar em uma sala já existente? <a href="#">Clique aqui</a></p>
          </form>
        </div>
      </main>
    </div>
  )   
}