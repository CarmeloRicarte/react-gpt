import { useRef, useState } from 'react';

type TextMessageBoxFile = {
  onSendMessage: (message: string) => void;
  placeholder?: string;
  disableCorrections?: boolean;
  accept?: string;
};

export const TextMessageBoxFile = ({
  onSendMessage,
  placeholder,
  disableCorrections = false,
  accept,
}: TextMessageBoxFile) => {
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputFileref = useRef<HTMLInputElement>(null);

  const handleSendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = event.currentTarget.message.value;

    onSendMessage(message);
    setMessage('');
    setSelectedFile(null);
  };
  return (
    <form
      onSubmit={handleSendMessage}
      className='flex flex-row items-center h-16 rounded-xl bg-white w-full px-4'
    >
      <div className='mr-3'>
        <button
          type='button'
          className='flex items-center justify-center text-gray-400 hover:text-gray-600'
          onClick={() => inputFileref.current?.click()}
        >
          <i className='fa-solid fa-paperclip text-xl'></i>
        </button>
        <input
          type='file'
          ref={inputFileref}
          name='upload-file'
          id='upload-file'
          accept={accept}
          onChange={(event) =>
            setSelectedFile(event.target.files?.item(0) || null)
          }
          hidden
        />
      </div>
      <div className='flex-grow'>
        <div className='relative w-full'>
          <input
            type='text'
            autoFocus
            name='message'
            className='flex w-full border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4 h-10'
            placeholder={placeholder}
            autoComplete={disableCorrections ? 'on' : 'off'}
            autoCorrect={disableCorrections ? 'on' : 'off'}
            spellCheck={disableCorrections ? true : false}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
        </div>
      </div>

      <div className='ml-4'>
        <button className='btn-primary' disabled={!selectedFile}>
          {selectedFile ? (
            <span className='mr-2'>
              {selectedFile.name.substring(0, 10) + '...'}
            </span>
          ) : (
            <span className='mr-2'>Enviar</span>
          )}

          <i className='fa-regular fa-paper-plane'></i>
        </button>
      </div>
    </form>
  );
};
