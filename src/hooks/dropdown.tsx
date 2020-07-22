import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';

export interface Option {
  id: number;
  optionDimensions: DOMRect;
  contentDimensions?: DOMRect;
  optionCenterX: number;
  WrappedContent: React.FC;
  backgroundHeight: number | undefined;
}

interface DropdownContextData {
  options: Option[];
  targetId: number;
  setTargetId: React.Dispatch<React.SetStateAction<number>>;
  setCachedId: React.Dispatch<React.SetStateAction<number>>;
  cachedId: number;
  addOption(options: Option): void;
  updateOptionProps(optionID: number, props: any): void;
  getOptionById(id: number): Option | undefined;
  deleteOptionById(id: number): void;
}

const DropdownContext = createContext<DropdownContextData>(
  {} as DropdownContextData,
);

export const DropdownProvider: React.FC = ({ children }) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [targetId, setTargetId] = useState<number>(0);
  const [cachedId, setCachedId] = useState<number>(0);

  const addOption = useCallback(
    ({
      id,
      optionDimensions,
      optionCenterX,
      WrappedContent,
      backgroundHeight,
    }: Option) =>
      setOptions(old => [
        ...old,
        {
          id,
          optionDimensions,
          optionCenterX,
          WrappedContent,
          backgroundHeight,
        },
      ]),
    [],
  );

  const updateOptionProps = useCallback(
    (optionId, props) =>
      setOptions(items =>
        items.map(item => {
          if (item.id === optionId) {
            item = { ...item, ...props };
          }

          return item;
        }),
      ),
    [],
  );

  const getOptionById = useCallback(
    (id: number) => options.find(item => item.id === id),
    [options],
  );

  const deleteOptionById = useCallback(
    (id: number) => setOptions(items => items.filter(item => item.id !== id)),
    [],
  );

  useEffect(() => {
    targetId && setCachedId(targetId);
  }, [targetId]);

  return (
    <DropdownContext.Provider
      value={{
        options,
        targetId,
        cachedId,
        setTargetId,
        setCachedId,
        addOption,
        updateOptionProps,
        getOptionById,
        deleteOptionById,
      }}
    >
      {children}
    </DropdownContext.Provider>
  );
};

export function useDropdown(): DropdownContextData {
  const context = useContext(DropdownContext);

  if (!context) {
    throw new Error('useDropdown must be used whitin an DropdownProvider');
  }

  return context;
}
