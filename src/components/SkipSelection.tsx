import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSkipStore } from '../store/skipStore';
import { SkipCard } from './SkipCard';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

export const SkipSelection = () => {
  const { skips, selectedSkip, loading, error, fetchSkips, selectSkip } =
    useSkipStore();

  useEffect(() => {
    // For demo purposes, we're using the example postcode and area
    fetchSkips('NR32', 'Lowestoft');
  }, [fetchSkips]);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <ArrowPathIcon className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700">
        <p className="font-medium">Error loading skips</p>
        <p className="mt-1 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Choose Your Skip Size
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Select the skip size that best fits your needs. All prices include VAT
          and delivery.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {skips.map((skip) => (
            <motion.div
              key={skip.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <SkipCard
                skip={skip}
                isSelected={selectedSkip?.id === skip.id}
                onSelect={selectSkip}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {selectedSkip && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 rounded-lg bg-primary-50 p-6"
        >
          <h2 className="text-xl font-semibold text-primary-900">
            Selected Skip Details
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm text-primary-700">Size</p>
              <p className="font-medium text-primary-900">
                {selectedSkip.size} Yard Skip
              </p>
            </div>
            <div>
              <p className="text-sm text-primary-700">Hire Period</p>
              <p className="font-medium text-primary-900">
                {selectedSkip.hire_period_days} days
              </p>
            </div>
            <div>
              <p className="text-sm text-primary-700">Total Price (inc. VAT)</p>
              <p className="font-medium text-primary-900">
                £
                {(
                  selectedSkip.price_before_vat +
                  (selectedSkip.price_before_vat * selectedSkip.vat) / 100
                ).toFixed(2)}
              </p>
            </div>
            {selectedSkip.transport_cost && (
              <div>
                <p className="text-sm text-primary-700">Transport Cost</p>
                <p className="font-medium text-primary-900">
                  £{selectedSkip.transport_cost.toFixed(2)}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};
