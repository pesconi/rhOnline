import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./components/private-route/private-route";
import SignIn from "./pages/login/login";
import { useAuth } from "./hooks/auth";


const App = () => {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      {/* <Route index element={<SignIn />} /> */}
      <Route path="/recupera-senha" element={<h1>Recupera Senha</h1>} />
      {/* Rotas privadas (necessitam login) */}
      <Route path="/contracheque" element={
        <PrivateRoute user={user}>
          <h1>ContraCheque</h1>
        </PrivateRoute>
      }>
      </Route>
      <Route path="/rendimento" element={
        <PrivateRoute user={user}>
          <h1>Comprovante de Rendimentos</h1>
        </PrivateRoute>
      } />
      <Route path="/dados" element={
        <PrivateRoute user={user}>
          <h1>Meus Dados</h1>
        </PrivateRoute>
      } />
    </Routes>
  )
}



export default App;
