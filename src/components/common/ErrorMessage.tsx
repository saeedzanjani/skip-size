import { memo, type FC } from 'react';

interface ErrorMessageProps {
  error: string;
  title?: string;
}

const ErrorMessage: FC<ErrorMessageProps> = memo(({ error, title = 'Error loading data' }) => {
  return (
    <div className="rounded-lg bg-red-50 p-4 text-red-700" aria-live="polite">
      <p className="font-medium">{title}</p>
      <p className="mt-1 text-sm">{error}</p>
    </div>
  );
});

ErrorMessage.displayName = 'ErrorMessage';

export { ErrorMessage };
