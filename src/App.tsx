import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./components/private-route/private-route";

import useAuth from "./hooks/useAuth";
import Login from "./pages/login/login";
import { SaveCliente } from "./components/utils";


const App = () => {
  const { user, handleSignIn, handleLogout } = useAuth();

  return (
    <Routes>

      <Route path="/" element={<Login handleSignIn={handleSignIn} />} />
      <Route path="/recupera-senha" element={<h1>Recupera Senha</h1>} />
      {/* Rotas privadas (necessitam login) */}
      <Route path="/contracheque" element={
        <PrivateRoute>
          <h1>ContraCheque {JSON.stringify(user) ?? ''} </h1>
        </PrivateRoute>
      } />
      <Route path="/rendimento" element={
        <PrivateRoute>
          <h1>Comprovante de Rendimentos {JSON.stringify(user) ?? ''}</h1>
        </PrivateRoute>
      } />
      <Route path="/dados" element={
        <PrivateRoute>
          <h1>Meus Dados {JSON.stringify(user) ?? ''}</h1>
        </PrivateRoute>
      } />
      <Route path="*" element={<Login handleSignIn={handleSignIn} />} />
    </Routes>
  )
}



export default App;
