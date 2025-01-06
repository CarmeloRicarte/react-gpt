import {
  GptMessage,
  MyMessage,
  TextMessageBox,
  TypingLoader,
} from '@core/index';
import { useRef, useState } from 'react';
import { prosConsDiscusserStreamGeneratorUseCase } from '../../application';

type Message = {
  text: string;
  isGpt: boolean;
};

export const ProsConsStreamPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const isRequestRunning = useRef(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const abortController = useRef(new AbortController());

  const handlePost = async (text: string) => {
    if (isRequestRunning.current) {
      abortController.current.abort();
      abortController.current = new AbortController();
    }
    setIsLoading(true);
    isRequestRunning.current = true;
    setMessages((prevMesages) => [...prevMesages, { text, isGpt: false }]);
    const stream = prosConsDiscusserStreamGeneratorUseCase(
      text,
      abortController.current.signal
    );
    setIsLoading(false);

    // generate the last message
    if (!stream) {
      return alert('No se pudo leer la respuesta');
    }

    setMessages((prevMesages) => [...prevMesages, { text: '', isGpt: true }]);

    for await (const text of stream) {
      setMessages((prevMesages) => {
        const newMessages = [...prevMesages];
        newMessages[newMessages.length - 1].text = text;
        return newMessages;
      });
    }
    isRequestRunning.current = false;
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
