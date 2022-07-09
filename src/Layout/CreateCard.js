import React, { useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { createCard } from "../utils/api/index";

export default function CreateCard({ deck }) {
  const { url } = useRouteMatch();
  const breadcrumb = (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to={`${url}`}> {deck.name} </Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Edit Deck
        </li>
      </ol>
    </nav>
  );
  let initialCardForm = {
    front: "",
    back: "",
  };

  const [cardFormData, setCardFormData] = useState(initialCardForm);

  const handleCreateCard = async (event) => {
    event.preventDefault();
    await createCard(deck.id, {
      front: cardFormData.front,
      back: cardFormData.back,
    });
    console.log("hello world");
    setCardFormData(initialCardForm);
  };

  const handleCardFormChange = (event) => {
    event.preventDefault();
    setCardFormData({
      ...initialCardForm,
      ...cardFormData,
      [event.target.name]: event.target.value,
    });
  };

  const addCard = (
    <form onSubmit={handleCreateCard}>
      <div className="mb-3">
        <label htmlFor="front" className="form-label">
          {" "}
          Front{" "}
        </label>
        <input
          id="front"
          name="front"
          type="text"
          className="form-control"
          value={cardFormData.front}
          onChange={handleCardFormChange}
          placeholder="Enter the card front here"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="back" className="form-label">
          {" "}
          Back{" "}
        </label>
        <textarea
          id="back"
          name="back"
          className="form-control"
          value={cardFormData.back}
          onChange={handleCardFormChange}
          placeholder="Enter the card back here"
          rows="4"
          required
        />
      </div>
      <Link to={`/decks/${deck.id}`} className="btn btn-secondary">
        Cancel
      </Link>
      <button
        type="submit"
        className="btn btn-primary"
        style={{ margin: "0 10px" }}
      >
        Submit
      </button>
    </form>
  );

  return (
    <div>
      {breadcrumb}
      <h3>{deck.name}: Add Card</h3>
      {addCard}
    </div>
  );
}