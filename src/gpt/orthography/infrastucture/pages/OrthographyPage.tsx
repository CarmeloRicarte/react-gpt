import {
  GptMessage,
  MyMessage,
  TextMessageBox,
  TypingLoader,
} from '@core/infrastucture/components';
import { GptOrthographyMessage, orthographyUseCase } from '@orthography';
import { useState } from 'react';

type Message = {
  text: string;
  isGpt: boolean;
  info?: {
    userScore: number;
    errors: string[];
    message: string;
  };
};

export const OrthographyPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages((prevMesages) => [...prevMesages, { text, isGpt: false }]);
    const { ok, errors, message, userScore } = await orthographyUseCase(text);
    if (ok) {
      setMessages((prevMesages) => [
        ...prevMesages,
        { text: message, isGpt: true, info: { userScore, errors, message } },
      ]);
    } else {
      setMessages((prevMesages) => [
        ...prevMesages,
        { text: 'No se pudo realizar la corrección', isGpt: true },
      ]);
    }
    setIsLoading(false);
  };

  return (
    <div className='chat-container'>
      <div className='chat-messages'>
        <div className='grid grid-cols-12 gap-y-2'>
          <GptMessage text='Hola, puedes escribir tu texto en español y te ayudo con las correcciones' />

          {messages.map((message, index) =>
            message.isGpt ? (
              <GptOrthographyMessage
                key={`${message.info?.message}-${index}`}
                {...message.info!}
              />
            ) : (
              <MyMessage key={`${message.text}-${index}`} text={message.text} />
            )
          )}

          {isLoading && (
            <div className='col-start-1 col-end-12 fade-in'>
              <TypingLoader className='fade-in' />
            </div>
          )}
        </div>
      </div>

      <TextMessageBox
        onSendMessage={handlePost}
        placeholder='Escribe aquí lo que deseas'
        disableCorrections
      />
    </div>
  );
};
