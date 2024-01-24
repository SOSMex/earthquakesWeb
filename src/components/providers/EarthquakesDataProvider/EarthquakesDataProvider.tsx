'use client';

import { createContext, useContext, useMemo, useState } from 'react';
import { EarthquakeProps } from '@/components/widgets';

type EarthquakesDataContextType = {
  earthquakes: EarthquakeProps[];
  // eslint-disable-next-line no-unused-vars
  setEarthquakes: (prev: any) => void;
  selected: EarthquakeProps | null;
  // eslint-disable-next-line no-unused-vars
  setSelected: (prev: any) => void;
};

const EarthquakesDataContext = createContext<EarthquakesDataContextType>({
  earthquakes: [],
  setEarthquakes: () => {},
  selected: null,
  setSelected: () => {},
});

export function EarthquakesDataProvider({
  children,
  earthquakes = [],
}: {
  children: React.ReactNode;
  earthquakes?: EarthquakeProps[];
}) {
  const [earthquakesState, setEarthquakes] = useState<EarthquakeProps[]>(earthquakes);
  const [selected, setSelected] = useState<EarthquakeProps | null>(null);

  const value = useMemo(
    () => ({
      earthquakes: earthquakesState,
      setEarthquakes,
      selected,
      setSelected,
    }),
    [earthquakesState, setEarthquakes, selected, setSelected],
  );

  return (
    <EarthquakesDataContext.Provider value={value}>{children}</EarthquakesDataContext.Provider>
  );
}

export function useEarthquakesData() {
  const context = useContext(EarthquakesDataContext);

  if (!context) {
    throw new Error('useEarthquakesData must be used within a EarthquakesDataProvider');
  }

  return context;
}
