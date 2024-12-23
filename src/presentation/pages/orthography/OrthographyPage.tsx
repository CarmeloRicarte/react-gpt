import { useState } from 'react';
import {
  GptMessage,
  MyMessage,
  TextMessageBoxSelect,
  TypingLoader,
} from '../../components';

type Message = {
  text: string;
  isGpt: boolean;
};

export const OrthographyPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages((prevMesages) => [...prevMesages, { text, isGpt: false }]);
    // TODO: UseCase

    setIsLoading(false);
    // TODO: añadir el mensaje de isGpt en true
  };
  return (
    <div className='chat-container'>
      <div className='chat-messages'>
        <div className='grid grid-cols-12 gap-y-2'>
          <GptMessage text='Hola, puedes escribir tu texto en español y te ayudo con las correcciones' />
          {messages.map((message, index) =>
            message.isGpt ? (
              <GptMessage
                key={`${message.text}-${index}`}
                text='Esto es de OpenAI'
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

      {/* <TextMessageBox
        onSendMessage={handlePost}
        placeholder='Escribe aquí lo que deseas'
        disableCorrections
      /> */}

      {/* <TextMessageBoxFile
        onSendMessage={handlePost}
        placeholder='Escribe aquí lo que deseas'
      /> */}

      <TextMessageBoxSelect
        onSendMessage={handlePost}
        options={[
          { id: '1', text: 'Hola' },
          { id: '2', text: 'Mundo' },
        ]}
      />
    </div>
  );
};
