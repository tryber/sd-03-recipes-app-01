import React, { useState, useEffect } from 'react';

const useLocalStorage = (initStorage, setStorage) => {
  const [stored, setStored] = useState(initStorage); // you can take only one part of your storaged

  useEffect(() => {
    setStorage(stored); // and pass a callback to set only this part
  }, [stored]);

  return [stored, setStored];
};

export default useLocalStorage;
