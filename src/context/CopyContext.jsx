import React, { createContext, useState, useContext } from 'react';

const CopyContext = createContext();

export const CopyProvider = ({ children }) => {
  const [lastCopiedId, setLastCopiedId] = useState(null);

  return (
    <CopyContext.Provider value={{ lastCopiedId, setLastCopiedId }}>
      {children}
    </CopyContext.Provider>
  );
};

export const useCopyContext = () => useContext(CopyContext);