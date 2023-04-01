import { createContext, useState } from "react";

export const Menu = createContext(null);

export default function MenuProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Menu.Provider value={{ isOpen, setIsOpen }}>{children}</Menu.Provider>
  );
}
