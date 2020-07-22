import React, { useMemo, useState, useEffect } from 'react';

import { useDropdown } from '../../hooks/dropdown';

import DropdownSection from './DropdownSection';
import DropdownBackground from './DropdownBackground';
import DropdownArrow from './DropdownArrow';

import {
  Container,
  DropdownContainer,
  DropdownContainerAnimated,
  WrapperPerspective,
} from './styles';

const DropdownRoot: React.FC = () => {
  const { options, cachedId, getOptionById, targetId } = useDropdown();

  const cachedOption = useMemo(() => getOptionById(cachedId), [
    cachedId,
    getOptionById,
  ]);

  let [width, height, x] = [0, 0, 0];

  if (cachedOption) {
    const { optionCenterX, contentDimensions } = cachedOption;

    width = contentDimensions?.width || 0;
    height = contentDimensions?.height || 0;
    x = optionCenterX - width / 2;
  }

  const [hovering, setHovering] = useState(false);
  const isActive = targetId !== 0 || hovering;

  const [hasInteracted, setHasInterected] = useState(false);

  const isFirstInteraction = isActive && !hasInteracted;

  if (isFirstInteraction) {
    setTimeout(() => {
      if (!hasInteracted) setHasInterected(true);
    }, 15);
  }

  useEffect(() => {
    if (isActive) return;

    const timeout = setTimeout(
      () => setHasInterected(false),
      0.22 * 1000 * 0.9,
    );

    clearTimeout(timeout);
  }, [isActive]);

  return (
    <WrapperPerspective>
      <Container
        animate={{ opacity: isActive ? 1 : 0, rotateX: isActive ? 0 : -15 }}
        transition={{
          opacity: { duration: 0.22, delay: 0.05 },
          rotateX: { duration: 0.22, delay: 0.05 },
        }}
      >
        <DropdownContainer
          animate={{
            x,
            width,
            height,
            pointerEvents: isActive ? 'unset' : 'none',
          }}
          transition={{
            ease: 'easeOut',
            x: isFirstInteraction ? { duration: 0 } : 0.22,
            width: { duration: isFirstInteraction ? 0 : 0.22 * 0.93 },
            height: { duration: isFirstInteraction ? 0 : 0.22 * 0.93 },
            pointerEvents: { delay: 0.05 },
          }}
          onHoverStart={() => setHovering(true)}
          onHoverEnd={() => setHovering(false)}
        >
          <DropdownBackground />

          <DropdownContainerAnimated
            animate={{ x: -x }}
            transition={{
              x: isFirstInteraction ? { duration: 0 } : undefined,
            }}
          >
            {options.map(item => (
              <DropdownSection key={item.id} option={item} />
            ))}
          </DropdownContainerAnimated>
        </DropdownContainer>

        <DropdownArrow isFirstInteraction={isFirstInteraction} />
      </Container>
    </WrapperPerspective>
  );
};

export default DropdownRoot;
