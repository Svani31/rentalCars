"use client";
import { createContext, ReactNode, useContext, useState } from "react";

type StoreContextProps = {
  user: string;
  setUser: unknown;
};

export const StoreContext = createContext({} as StoreContextProps);

export const useStore = (): StoreContextProps => useContext(StoreContext);

type StoreProps = {
  children: ReactNode;
};

export function StoreProvider({ children }: StoreProps) {
  const [user, setUser] = useState("Giorgi");

  const store = {
    user,
    setUser,
  };

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}
