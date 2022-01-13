import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
function Card(props) {

    const { cardClickHandler, onCardDelete, card, onCardLike} = props;
    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = card.owner === currentUser._id;
    // Creating a variable which you'll then set in `className` for the delete button
    const cardDeleteButtonClassName = (
        `elements__delete-button ${isOwn ? 'elements__delete-button_active' : 'elements__delete-button_hidden'}`
    );

    // Check if the card was liked by the current user
    const isLiked = card.likes?.includes(currentUser._id);

    // Create a variable which you then set in `className` for the like button
    const cardLikeButtonClassName = `elements__like-button ${isLiked ? 'elements__like-button_active' : 'elements__like-button_hidden'}`;

    return (
        <li className="elements__card">
            {isOwn && (
            <button type="button" onClick={() => onCardDelete(card)} className={`${cardDeleteButtonClassName}`} aria-label="delete button"></button>
            )}
            <div className="elements__pic" onClick={() => cardClickHandler(card)} style={{ backgroundImage: `url(${card.imageLink})` }} alt={card.name}></div>
            <div className="elements__inner-container">
                <h2 className="elements__title">{card.name}</h2>
                <div className="elements__likes-container">
                    <button onClick={() => onCardLike(card)} type="button" className={`${cardLikeButtonClassName}`} aria-label="like button"></button>
                    <p className="element__like-counter">
                        {card.likes.length}
                    </p>
                </div>
            </div>
        </li>
    )
}

export default Card;

