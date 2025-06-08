import { memo, type FC } from 'react';

export interface SkipSelectionHeaderProps {
  title: string;
  description: string;
}

const SkipSelectionHeader: FC<SkipSelectionHeaderProps> = ({ title, description }) => (
  <div className="text-center">
    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
      {title}
    </h1>
    <p className="mt-4 text-lg text-gray-600">
      {description}
    </p>
  </div>
);

SkipSelectionHeader.displayName = 'SkipSelectionHeader';

export default memo(SkipSelectionHeader);
