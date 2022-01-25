import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { getDatabase, ref, get, child } from 'firebase/database';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import '../styles/auth.scss';

import { Button } from '../components/Button';

export function Home() {
  const navigate = useNavigate();
  const { user, signInWithGoogle } = useAuth();
  const [room, setRoom] = useState('');

  async function createRoom() {
    if (!user) {
      await signInWithGoogle()
    }
    navigate('/rooms/new');
  }

  async function enterRoom(event: FormEvent) {
    event.preventDefault();

    const roomCode = room.trim();

    if (roomCode == '') return;

    const roomRef = ref(getDatabase(), `rooms/${roomCode}`);

    const result = await get(roomRef);
    
    if (!result.exists()) {
      return alert('Room does not exist.');
    }

    if (result.val().endedAt) {
      return alert('Room already closed.');
    }

    navigate(`rooms/${roomCode}`)
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Toda pergunta tem uma resposta.</strong>
        <p>Aprenda e compartilhe conhecimento com outras pessoas</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <Button onClick={createRoom} className="create-room">
            <img src={googleIconImg} alt="Logo da Google" />
            Crie sua sala com o google
          </Button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={enterRoom}>
            <input 
              type="text" 
              placeholder="Digite o código da sala" 
              onChange={event => setRoom(event.target.value)}
            />
            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}