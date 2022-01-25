import { useNavigate, useParams } from 'react-router-dom'
import { ref, getDatabase, remove, update, set } from "firebase/database";

import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';
import emptyImg from '../assets/images/empty-state.svg';

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

  async function checkQuestion(questionId: string) {
    let questionRef = ref(getDatabase(), `rooms/${roomId}/questions/${questionId}`);

    await update(questionRef, {
      isAnswered: true
    })
  }

  async function highlightQuestion(questionId: string) {
    let questionRef = ref(getDatabase(), `rooms/${roomId}/questions/${questionId}`);

    await update(questionRef, {
      isHighlighted: true
    })
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

      <main className='pt56'>
        <div className="room-title">
          <h1>Sala: {title}</h1>
          { questions.length > 0 && <span>{questions.length} pergunta(s)</span> }
        </div>

        <div className="question-list">

          {questions.length > 0 ? 
          
            questions.map(question => {
              return (
                <Question
                  key={question.id}
                  content={question.content}
                  author={question.author}
                  isAnswered={question.isAnswered}
                  isHighlighted={question.isHighlighted}
                >
                  {!question.isAnswered && (
                    <>
                      <button
                        type="button"
                        onClick={() => checkQuestion(question.id)}
                      >
                        <img src={checkImg} alt="Marcar pergunta como respondida" />
                      </button>
                      <button
                        type="button"
                        onClick={() => highlightQuestion(question.id)}
                      >
                        <img src={answerImg} alt="Dar destaque à pergunta" />
                      </button>
                    </>
                  )}
                  <button
                    type="button"
                    onClick={() => deleteQuestion(question.id)}
                  >
                    <img src={deleteImg} alt="Remover pergunta" />
                  </button>
                </Question>
              );
            })

            :

            <div className="empty mt80">
              <img src={emptyImg} alt="Ilustração para sala sem perguntas" className='mb16' />
              <h3 className='mb8'>Nenhuma pergunta por aqui...</h3>
              <p>Envie o código desta sala para seus amigos e comece a responder perguntas!</p>
            </div>
        
          }
        </div>
      </main>
    </div>
  );
}