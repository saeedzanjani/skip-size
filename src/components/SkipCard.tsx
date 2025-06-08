import { memo, useMemo, useCallback } from 'react';
import type { FC, KeyboardEvent } from 'react';
import { motion } from 'framer-motion';
import type { Skip } from '../types/skip.types';
import { TruckIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { getTotalPrice, formatPrice } from '../utils/price';
import SkipFeatureItem from './SkipFeatureItem';

interface SkipCardProps {
  skip: Skip;
  isSelected: boolean;
  onSelect: (skip: Skip) => void;
}

const SkipCard: FC<SkipCardProps> = ({ skip, isSelected, onSelect }) => {
  const { totalPrice, transportCost } = useMemo(() => ({
    totalPrice: getTotalPrice(skip?.price_before_vat, skip?.vat),
    transportCost: skip?.transport_cost || 0
  }), [skip?.price_before_vat, skip?.vat, skip?.transport_cost]);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(skip);
    }
  }, [onSelect, skip]);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`card cursor-pointer p-6 ${
        isSelected ? 'ring-2 ring-primary-500' : ''
      }`}
      onClick={() => onSelect(skip)}
      tabIndex={0}
      role="button"
      aria-pressed={isSelected}
      aria-label={`Select ${skip?.size} yard skip`}
      onKeyDown={handleKeyDown}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">
            {skip?.size} Yard Skip
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {skip?.hire_period_days} days hire period
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary-600">
            {formatPrice(totalPrice)}
          </p>
          <p className="text-sm text-gray-500">inc. VAT</p>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {transportCost > 0 && (
          <SkipFeatureItem
            icon={TruckIcon}
            text={`Transport cost: ${formatPrice(transportCost)}`}
          />
        )}
        {!skip?.allowed_on_road && (
          <SkipFeatureItem
            icon={ExclamationTriangleIcon}
            text="Not allowed on road"
            className="text-amber-600"
          />
        )}
        {skip?.allows_heavy_waste && (
          <SkipFeatureItem
            text="✓ Suitable for heavy waste"
            className="text-green-600"
          />
        )}
      </div>

      <div className="mt-6">
        <span
          className={`btn block w-full text-center ${
            isSelected ? 'btn-primary' : 'btn-secondary'
          }`}
          aria-hidden="true"
        >
          {isSelected ? 'Selected' : 'Select Skip'}
        </span>
      </div>
    </motion.div>
  );
};

export default memo(SkipCard);
