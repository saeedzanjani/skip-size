import { Loading, ErrorMessage } from './index';
import { useSkipLoading, useSkipError, useSkipStore } from '../../store/skipStore';
import React, { memo, useEffect, useRef, type FC } from 'react';

interface SkipLoaderProps {
  children: React.ReactNode;
}

const SkipLoader: FC<SkipLoaderProps> = memo(({ children }) => {
  const loading = useSkipLoading();
  const error = useSkipError();
  const fetchSkips = useSkipStore(state => state.fetchData);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchSkips('NR32', 'Lowestoft');
    }
  }, [fetchSkips]);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;

  return <>{children}</>;
});

SkipLoader.displayName = 'SkipLoader';

export { SkipLoader };
