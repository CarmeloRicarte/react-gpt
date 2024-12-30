import Markdown from 'react-markdown';

type MyMessageProps = { text: string };
export const MyMessage = ({ text }: MyMessageProps) => {
  return (
    <div className='col-start-6 col-end-13 p-3 rounded-lg'>
      <div className='flex flex-row-reverse items-center justify-start'>
        <div className='flex items-center justify-center h-10 w-10 rounded-full bg-indigo-600 flex-shrink-0'>
          F
        </div>
        <div className='relative mr-3 text-sm bg-indigo-700 bg-opacity-25 py-2 px-4 shadow rounded-xl'>
          <Markdown>{text}</Markdown>
        </div>
      </div>
    </div>
  );
};
