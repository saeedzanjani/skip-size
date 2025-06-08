import { memo } from 'react';
import type { FC } from 'react';
import type { Skip } from '../types/skip.types';
import { getTotalPrice } from '../utils/price';

interface SelectedSkipDetailsProps {
  skip: Skip;
}

const SelectedSkipDetails: FC<SelectedSkipDetailsProps> = ({ skip }) => {
  return (
    <div className="mt-8 rounded-lg bg-primary-50 p-6">
      <h2 className="text-xl font-semibold text-primary-900">Selected Skip Details</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-sm text-primary-700">Size</p>
          <p className="font-medium text-primary-900">{skip.size} Yard Skip</p>
        </div>
        <div>
          <p className="text-sm text-primary-700">Hire Period</p>
          <p className="font-medium text-primary-900">{skip.hire_period_days} days</p>
        </div>
        <div>
          <p className="text-sm text-primary-700">Total Price (inc. VAT)</p>
          <p className="font-medium text-primary-900">£{getTotalPrice(skip.price_before_vat, skip.vat).toFixed(2)}</p>
        </div>
        {skip.transport_cost && (
          <div>
            <p className="text-sm text-primary-700">Transport Cost</p>
            <p className="font-medium text-primary-900">£{skip.transport_cost.toFixed(2)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(SelectedSkipDetails);
