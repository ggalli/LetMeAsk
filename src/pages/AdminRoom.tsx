import { useNavigate, useParams } from 'react-router-dom'
import { ref, getDatabase, remove, update } from "firebase/database";

import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';

import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';
import { useRoom } from '../hooks/useRoom';

import '../styles/room.scss';

type RoomParams = {
  roomId: string;
}

export function AdminRoom() {
  const navigate = useNavigate();
  
  const params = useParams<RoomParams>();

  const roomId = params.roomId || '';

  const { title, questions } = useRoom(roomId)

  async function endRoom() {
    let roomRef = ref(getDatabase(), `rooms/${roomId}`);

    await update(roomRef, {
      endedAt: new Date()
    })

    navigate('/');
  }

  async function deleteQuestion(questionId: string) {
    let questionRef = ref(getDatabase(), `rooms/${roomId}/questions/${questionId}`);

    if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
      await remove(questionRef);
    }
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button outlined onClick={endRoom}>Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          { questions.length > 0 && <span>{questions.length} pergunta(s)</span> }
        </div>

        <div className="question-list">
          {questions.map(question => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
              >
                <button
                  type="button"
                  onClick={() => deleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="Remover pergunta" />
                </button>
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
}