import { memo } from 'react';
import type { FC } from 'react';
import type { ComponentType, SVGProps } from 'react';

interface SkipFeatureItemProps {
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  text: string;
  className?: string;
}

const SkipFeatureItem: FC<SkipFeatureItemProps> = ({ icon: Icon, text, className = 'text-gray-600' }) => {
  return (
    <div className={`flex items-center text-sm ${className}`}>
      {Icon && <Icon className="mr-2 h-5 w-5" />}
      <span>{text}</span>
    </div>
  );
};

export default memo(SkipFeatureItem);
