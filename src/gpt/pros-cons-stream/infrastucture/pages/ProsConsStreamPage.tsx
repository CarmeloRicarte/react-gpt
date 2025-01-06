import {
  GptMessage,
  MyMessage,
  TextMessageBox,
  TypingLoader,
} from '@core/index';
import { useState } from 'react';
import { prosConsDiscusserStreamUseCase } from '../../application';

type Message = {
  text: string;
  isGpt: boolean;
};

export const ProsConsStreamPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages((prevMesages) => [...prevMesages, { text, isGpt: false }]);
    const reader = await prosConsDiscusserStreamUseCase(text);
    setIsLoading(false);

    // generate the last message
    if (!reader) {
      return alert('No se pudo leer la respuesta');
    }

    const decoder = new TextDecoder();
    let message = '';
    setMessages((prevMesages) => [
      ...prevMesages,
      { text: message, isGpt: true },
    ]);

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      const decodedChunk = decoder.decode(value, { stream: true });
      message += decodedChunk;
      setMessages((prevMesages) => {
        const newMessages = [...prevMesages];
        newMessages[prevMesages.length - 1].text = message;
        return newMessages;
      });
    }
  };

  return (
    <div className='chat-container'>
      <div className='chat-messages'>
        <div className='grid grid-cols-12 gap-y-2'>
          <GptMessage text='Qué desas comparar?' />

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
