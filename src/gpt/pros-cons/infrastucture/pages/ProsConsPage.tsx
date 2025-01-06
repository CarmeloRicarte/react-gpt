import {
  GptMessage,
  MyMessage,
  TextMessageBox,
  TypingLoader,
} from '@core/infrastucture/components';
import { useState } from 'react';
import { prosConsDiscusserUseCase } from '../../application';

type Message = {
  text: string;
  isGpt: boolean;
};

export const ProsConsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages((prevMesages) => [...prevMesages, { text, isGpt: false }]);
    const { ok, message } = await prosConsDiscusserUseCase(text);
    if (ok) {
      setMessages((prevMesages) => [
        ...prevMesages,
        { text: message || '', isGpt: true },
      ]);
    } else {
      setMessages((prevMesages) => [
        ...prevMesages,
        { text: 'No se pudo realizar la comparación', isGpt: true },
      ]);
    }
    setIsLoading(false);
  };

  return (
    <div className='chat-container'>
      <div className='chat-messages'>
        <div className='grid grid-cols-12 gap-y-2'>
          <GptMessage text='Hola, escribe lo que quieras comparar para saber los pros/contras' />

          {messages.map((message, index) =>
            message.isGpt ? (
              <GptMessage
                key={`${message.text}-${index}`}
                text={message.text}
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
