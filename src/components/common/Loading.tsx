import { memo, type FC } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

interface LoadingProps {
  message?: string;
}

const Loading: FC<LoadingProps> = memo(({ message = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px]" aria-live="polite">
      <ArrowPathIcon className="h-8 w-8 animate-spin text-primary-600 mb-2" />
      <span className="text-gray-600 text-sm">{message}</span>
    </div>
  );
});

Loading.displayName = 'Loading';

export { Loading };
