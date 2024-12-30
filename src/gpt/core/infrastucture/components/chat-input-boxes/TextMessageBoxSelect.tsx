import { useState } from 'react';

type TextMessageBoxSelectProps = {
  onSendMessage: (message: string, selectedOption: string) => void;
  options: Option[];
  placeholder?: string;
  disableCorrections?: boolean;
};

type Option = {
  id: string;
  text: string;
};

export const TextMessageBoxSelect = ({
  onSendMessage,
  options,
  placeholder,
  disableCorrections = false,
}: TextMessageBoxSelectProps) => {
  const [message, setMessage] = useState('');
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleSendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = event.currentTarget.message.value;

    onSendMessage(message, selectedOption);
    setMessage('');
  };
  return (
    <form
      onSubmit={handleSendMessage}
      className='flex flex-row items-center h-16 rounded-xl bg-white w-full px-4'
    >
      <div className='flex-grow'>
        <div className='flex'>
          <input
            type='text'
            autoFocus
            name='message'
            className='w-full border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4 h-10'
            placeholder={placeholder}
            autoComplete={disableCorrections ? 'on' : 'off'}
            autoCorrect={disableCorrections ? 'on' : 'off'}
            spellCheck={disableCorrections ? true : false}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />

          <select
            name='select'
            className='w-2/5 ml-5 border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4 h-10'
            value={selectedOption}
            onChange={(event) => setSelectedOption(event.target.value)}
          >
            <option value=''>Seleccione</option>
            {options.map(({ id, text }) => (
              <option key={id} value={id}>
                {text}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className='ml-4'>
        <button className='btn-primary' disabled={!message}>
          <span className='mr-2'>Enviar</span>
          <i className='fa-regular fa-paper-plane'></i>
        </button>
      </div>
    </form>
  );
};
