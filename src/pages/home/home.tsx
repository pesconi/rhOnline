import React from "react";
import Card from "../../components/card/card";
import useAuth from "../../hooks/useAuth";

const Home: React.FC = () => {
    const { user } = useAuth();

    return (
        <div className="container--home">

            <div className="content">
                <h2>Olá, {user?.no_usuario}.</h2>
                <div className="cards">
                    <Card img="./assets/images/contracheque2.png" title="Contracheque" redirect="/contracheque" />
                    <Card img="./assets/images/comprovante.png" title="Comprovante de Redimentos" redirect="/rendimentos" />
                    <Card img="./assets/images/cadastro.png" title="Profile" redirect="/profile" />
                </div>
            </div>
        </div>
    );
};

export default Home;