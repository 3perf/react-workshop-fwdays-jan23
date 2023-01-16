import { useEffect, useState } from "react";
import "./index.css";
import { createContext } from "use-context-selector";

export const DarkModeContext = createContext();
// export const DarkModeSetterContext = createContext();

export function DarkModeProvider({ children }) {
  const [mode, setMode] = useState("light");

  useEffect(() => {
    document.body.classList.add("theme-" + mode);

    return () => {
      document.body.classList.remove("theme-" + mode);
    };
  }, [mode]);

  // const contextValue = useMemo(
  //   () => ({
  //     mode,
  //     setMode,
  //   }),
  //   [mode]
  // ); // prevValue == nextValue unless mode changes

  return (
    <DarkModeContext.Provider value={{ mode, setMode }}>
      {/* <DarkModeSetterContext.Provider value={setMode}> */}
      {children}
      {/* </DarkModeSetterContext.Provider> */}
    </DarkModeContext.Provider>
  );
}

// 1) useMemo
// 2) create multiple contexts (officially recommended)
// 3) Prevent DarkModeProvider from rerendering
// 4) useContextSelector
