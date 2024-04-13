import { createContext, useContext, useEffect, useState } from "react";

export type State = {
  beaker?: "empty" | "filling" | "full" | "withdirt" | "shaken";
  dirtUsed?: boolean;
  stick?: "unused" | "used";
};
type ContextType = [State, React.Dispatch<React.SetStateAction<State>>];
const LocalStorageContext = createContext<ContextType | null>(null);

const LocalStorageProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setStateData] = useState<State>(() => {
    const data = localStorage.getItem("data");
    return data
      ? JSON.parse(data)
      : { beaker: "empty", dirtUsed: false, stick: "unused" };
  });

  const setState = (newState: React.SetStateAction<State>) => {
    setStateData({ ...state, ...newState });
  };

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(state));
  }, [state]);

  return (
    <LocalStorageContext.Provider value={[state, setState]}>
      {children}
    </LocalStorageContext.Provider>
  );
};

export const useLocalStorage = () => {
  const context = useContext(LocalStorageContext);
  if (!context) {
    throw new Error(
      "useLocalStorage must be used within a LocalStorageProvider"
    );
  }
  return context;
};

export const clearLocalStorage = () => {
  localStorage.removeItem("data");
};

export default LocalStorageProvider;
