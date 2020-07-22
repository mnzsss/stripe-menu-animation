import React, { useMemo } from 'react';

import { Option, useDropdown } from '../../../hooks/dropdown';

import { Container } from './styles';

interface Props {
  option: Option;
}

const DropdownSection: React.FC<Props> = ({ option }) => {
  const { WrappedContent, id, contentDimensions, optionCenterX } = option;

  const { cachedId } = useDropdown();

  const isActive = cachedId === id;

  const xSectionPosition = useMemo(() => {
    const contentWidth = contentDimensions?.width || 0;

    return optionCenterX - contentWidth / 2;
  }, [contentDimensions, optionCenterX]);

  return (
    <Container
      initial={{ x: xSectionPosition }}
      animate={{
        x: xSectionPosition,
        opacity: isActive ? 1 : 0,
        pointerEvents: isActive ? 'unset' : 'none',
      }}
      transition={{
        ease: 'easeOut',
        opacity: { duration: 0.2 },
      }}
    >
      <WrappedContent />
    </Container>
  );
};

export default DropdownSection;
