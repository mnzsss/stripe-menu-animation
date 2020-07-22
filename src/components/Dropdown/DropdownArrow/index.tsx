import React, { useMemo } from 'react';

import { useDropdown } from '../../../hooks/dropdown';

import { Container } from './styles';

interface Props {
  isFirstInteraction: boolean;
}

const DropdownArrow: React.FC<Props> = ({ isFirstInteraction }) => {
  const { cachedId, getOptionById } = useDropdown();

  const cachedOption = useMemo(() => getOptionById(cachedId), [
    cachedId,
    getOptionById,
  ]);

  const x = cachedOption ? cachedOption.optionCenterX : 0;

  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{
        x,
        pointerEvents: 'none',
        opacity: x > 0 ? 1 : 0,
      }}
      transition={{
        ease: 'easeOut',
        x: { duration: isFirstInteraction ? 0 : 0.22 },
      }}
    />
  );
};

export default DropdownArrow;
