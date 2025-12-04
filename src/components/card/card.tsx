import React from 'react';
import { useNavigate } from 'react-router-dom';


interface ICardProps {
    img: string;
    title: string;
    redirect: string;

}

const Card = ({ img, title, redirect }: ICardProps) => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate(redirect);
    }

    return (
        <div className="card" onClick={handleRedirect}>
            <div className="card__image">
                <img src={img} alt="Image" />
            </div>
            <div className="card__content">
                {title}
            </div>
        </div>
    );
}

export default Card