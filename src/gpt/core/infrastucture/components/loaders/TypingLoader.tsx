import './TypingLoader.css';

type TypingLoaderProps = {
  className?: React.HTMLAttributes<HTMLDivElement>['className'];
};

export const TypingLoader = ({ className }: TypingLoaderProps) => {
  return (
    <div className={`typing ${className}`}>
      <span className='circle scaling'></span>
      <span className='circle scaling'></span>
      <span className='circle scaling'></span>
    </div>
  );
};
