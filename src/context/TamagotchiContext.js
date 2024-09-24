//src/context/TamagotchiContext.js
import React, { createContext, useState, useContext } from 'react';

const TamagotchiContext = createContext();

export const TamagotchiProvider = ({ children }) => {
  const [tamagotchis, setTamagotchis] = useState([]);

  const updateFun = (id, newFun) => {
    setTamagotchis((prev) =>
      prev.map((tama) =>
        tama.id === id ? { ...tama, fun: newFun } : tama
      )
    );
  };

  return (
    <TamagotchiContext.Provider value={{ tamagotchis, updateFun }}>
      {children}
    </TamagotchiContext.Provider>
  );
};

export const useTamagotchi = () => useContext(TamagotchiContext);
