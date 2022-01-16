// import { useAuth } from '../hooks/useAuth';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import '../styles/auth.scss';

import { Button } from '../components/Button';

export function NewRoom() {
  // const { user } = useAuth();

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
          <form>
            <input type="text" placeholder="Nome da sala"/>
            <Button type="submit">
              Criar sala
            </Button>
            <p>Quer entrar em uma sala já existente? <a href="#">Clique aqui</a></p>
          </form>
        </div>
      </main>
    </div>
  )   
}