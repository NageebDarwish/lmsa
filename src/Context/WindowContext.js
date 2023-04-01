import { createContext, useEffect, useState } from "react";

export const WindowWidth = createContext(null);

export default function WindowProvider({ children }) {
  // Get Window Width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);
    // Clean Up Function
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  return (
    <WindowWidth.Provider value={{ windowWidth }}>
      {children}
    </WindowWidth.Provider>
  );
}
