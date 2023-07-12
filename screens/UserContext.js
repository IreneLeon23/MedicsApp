import React, { createContext, useState } from "react";

const UsuarioContext = createContext({
  idUsuario: "",
  setIdUsuario: () => {},
});

const UsuarioProvider = ({ children }) => {
  const [idUsuario, setIdUsuario] = useState("");

  return (
    <UsuarioContext.Provider value={{ idUsuario, setIdUsuario }}>
      {children}
    </UsuarioContext.Provider>
  );
};

export { UsuarioContext, UsuarioProvider };
