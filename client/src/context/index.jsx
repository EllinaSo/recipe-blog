import { createContext, useState, useContext } from 'react';

import { getUserFromStorage } from '../utils/auth';

const DataContext = createContext();
export const useContextData = () => useContext(DataContext);

const DATA = {
  profile: getUserFromStorage(),
};

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(DATA);

  const updateContext = (data) => setData((prev) => ({ ...prev, ...data }));

  return (
    <DataContext.Provider
      value={{
        ...data,
        updateContext,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
