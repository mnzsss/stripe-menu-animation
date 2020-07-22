import React, { useMemo } from 'react';

import { useDropdown } from '../../../hooks/dropdown';

import { Container } from './styles';

const DropdownBackground: React.FC = () => {
  const { cachedId, getOptionById } = useDropdown();

  const cachedOption = useMemo(() => getOptionById(cachedId), [
    cachedId,
    getOptionById,
  ]);

  const backgroundHeight = cachedOption?.backgroundHeight || 0;

  return (
    <Container
      animate={{ height: backgroundHeight }}
      transition={{ ease: 'easeOut', duration: 0.22 }}
    />
  );
};

export default DropdownBackground;
