import { motion } from 'framer-motion';
import type { Skip } from '../types/skip';
import { TruckIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface SkipCardProps {
  skip: Skip;
  isSelected: boolean;
  onSelect: (skip: Skip) => void;
}

export const SkipCard = ({ skip, isSelected, onSelect }: SkipCardProps) => {
  const totalPrice = skip.price_before_vat + (skip.price_before_vat * skip.vat) / 100;
  const transportCost = skip.transport_cost || 0;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`card cursor-pointer p-6 ${
        isSelected ? 'ring-2 ring-primary-500' : ''
      }`}
      onClick={() => onSelect(skip)}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">
            {skip.size} Yard Skip
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {skip.hire_period_days} days hire period
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary-600">
            £{totalPrice.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500">inc. VAT</p>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {transportCost > 0 && (
          <div className="flex items-center text-sm text-gray-600">
            <TruckIcon className="mr-2 h-5 w-5" />
            <span>Transport cost: £{transportCost.toFixed(2)}</span>
          </div>
        )}
        {!skip.allowed_on_road && (
          <div className="flex items-center text-sm text-amber-600">
            <ExclamationTriangleIcon className="mr-2 h-5 w-5" />
            <span>Not allowed on road</span>
          </div>
        )}
        {skip.allows_heavy_waste && (
          <div className="flex items-center text-sm text-green-600">
            <span>✓ Suitable for heavy waste</span>
          </div>
        )}
      </div>

      <div className="mt-6">
        <button
          className={`btn w-full ${
            isSelected ? 'btn-primary' : 'btn-secondary'
          }`}
        >
          {isSelected ? 'Selected' : 'Select Skip'}
        </button>
      </div>
    </motion.div>
  );
};
