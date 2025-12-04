import React from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/private-route/private-route";

import useAuth from "./hooks/useAuth";
import Login from "./pages/login/login";
import Home from "./pages/home/home";
import Contracheque from "./pages/contracheque/contracheque";
import Rendimentos from "./pages/rendimentos/rendimentos";


const App = () => {
  const { user, handleSignIn, handleLogout } = useAuth();

  console.log("User no App.tsx:", user);

  return (
    <Routes>

      <Route path="/" element={<Login handleSignIn={handleSignIn} />} />
      <Route path="/recupera-senha" element={<h1>Recupera Senha</h1>} />
      {/* Rotas privadas (necessitam login)  */}
      <Route path="/home" element={
        <PrivateRoute>
          <Home />
        </PrivateRoute>
      } />
      <Route path="/contracheque" element={
        <PrivateRoute>
          <Contracheque />
        </PrivateRoute>
      } />
      <Route path="/rendimentos" element={
        <PrivateRoute>
          <Rendimentos />
        </PrivateRoute>
      } />
      <Route path="/profile" element={
        <PrivateRoute>
          <h1>Meus Dados {JSON.stringify(user) ?? ''}</h1>
        </PrivateRoute>
      } />
      <Route path="*" element={<Login handleSignIn={handleSignIn} />} />
    </Routes>
  )
}



export default App;
