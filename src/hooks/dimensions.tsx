import { useState, useCallback, useLayoutEffect } from 'react';

const getDimensions = (element: HTMLElement): DOMRect =>
  element.getBoundingClientRect();

interface Dimensions {
  hook(e: HTMLButtonElement): void;
  dimensions: DOMRect | undefined;
  element: HTMLButtonElement | undefined;
}

export default function useDimensions(responsive = true): Dimensions {
  const [dimensions, setDimensions] = useState<DOMRect>();
  const [element, setElement] = useState<HTMLButtonElement>();

  const hook = useCallback((e: HTMLButtonElement) => setElement(e), []);

  useLayoutEffect(() => {
    if (element) {
      const updateDimensions = (): void => {
        window.requestAnimationFrame((): void => {
          return setDimensions(getDimensions(element));
        });
      };

      updateDimensions();

      if (responsive) {
        window.addEventListener('resize', updateDimensions);

        return window.removeEventListener('resize', updateDimensions);
      }
    }
  }, [element, responsive, hook]);

  return { hook, dimensions, element };
}
