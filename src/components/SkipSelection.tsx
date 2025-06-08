import { type FC } from 'react';
import { SkipCard, SelectedSkipDetails } from './index';
import { motion, AnimatePresence } from 'framer-motion';
import { useSkips, useSelectedSkip, useSkipStore } from '../store/skipStore';
import { Container } from '../layouts';
import type { Skip } from '../types/skip.types';
import SkipSelectionHeader from './SkipSelectionHeader';

const SkipSelection: FC = () => {
  const skips = useSkips();
  const selectedSkip = useSelectedSkip();
  const selectSkip = useSkipStore(state => state.selectItem);

  const handleSkipSelect = (skip: Skip) => {
    selectSkip(skip);
  };

  return (
    <Container>
      <SkipSelectionHeader
        title="Choose Your Skip Size"
        description="Select the skip size that best fits your needs. All prices include VAT and delivery."
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {skips?.map((skip) => (
            <motion.div
              key={`skip-${skip?.id}-${skip?.size}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <SkipCard
                skip={skip}
                isSelected={selectedSkip?.id === skip?.id}
                onSelect={handleSkipSelect}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {selectedSkip && <SelectedSkipDetails skip={selectedSkip} />}
    </Container>
  );
};

SkipSelection.displayName = 'SkipSelection';

export default SkipSelection;
