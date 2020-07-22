import React, { useRef, useState, useEffect, useCallback } from 'react';

import { useDropdown } from '../../../hooks/dropdown';
import useDimensions from '../../../hooks/dimensions';

import { Container } from './styles';

let lastOptionId = 0;

interface Props {
  name: string;
  content: React.FC;
  backgroundHeight?: number;
}

const DropdownOption: React.FC<Props> = ({
  name,
  content: Content,
  backgroundHeight,
}) => {
  const idRef = useRef(++lastOptionId);
  const id = idRef.current;

  const { hook, dimensions } = useDimensions();

  const [registered, setRegistered] = useState(false);

  const {
    addOption,
    updateOptionProps,
    setTargetId,
    targetId,
    deleteOptionById,
  } = useDropdown();

  useEffect(() => {
    if (!registered && dimensions) {
      const WrappedContent: React.FC = () => {
        const contentRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
          const contentDimensions = contentRef.current?.getBoundingClientRect();

          updateOptionProps(id, {
            contentDimensions,
          });
        }, []);

        return (
          <div ref={contentRef}>
            <Content />
          </div>
        );
      };

      addOption({
        id,
        optionDimensions: dimensions,
        optionCenterX: dimensions.x + dimensions.width / 2,
        WrappedContent,
        backgroundHeight,
      });

      setRegistered(true);
    } else if (registered && dimensions) {
      updateOptionProps(id, {
        optionDimensions: dimensions,
        optionCenterX: dimensions.x + dimensions.width / 2,
      });
    }
  }, [
    addOption,
    backgroundHeight,
    dimensions,
    id,
    registered,
    updateOptionProps,
  ]);

  useEffect(() => deleteOptionById(id), [deleteOptionById, id]);

  const handleOpen = useCallback(() => setTargetId(id), [id, setTargetId]);
  const handleClose = useCallback(() => setTargetId(0), [setTargetId]);
  const handleClick = useCallback(
    e => {
      e.preventDefault();

      return targetId === id ? handleClose() : handleOpen();
    },
    [handleClose, handleOpen, id, targetId],
  );

  return (
    <Container
      onMouseDown={handleClick}
      onHoverStart={handleOpen}
      onHoverEnd={handleClose}
      onFocus={handleOpen}
      onBlur={handleClose}
      ref={hook}
    >
      {name}
    </Container>
  );
};

export default DropdownOption;
