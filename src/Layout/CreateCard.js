import React, { useState, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { createCard } from "../utils/api/index";
import { readDeck } from "../utils/api/index";
import CardForm from "./CardForm";

export default function CreateCard() {
  let initialCardForm = {
    front: "",
    back: "",
  };

  const { params } = useRouteMatch();

  const [deck, setDeck] = useState({});
  const [cardFormData, setCardFormData] = useState(initialCardForm);

  useEffect(() => {
    async function getDeck() {
      const fetchedDeck = await readDeck(params.deckId);
      setDeck(fetchedDeck);
    }
    getDeck();
  }, [params.deckId]);

  console.log("params::::", params);
  console.log("deck::::", deck);
  console.log("FFFdeck::::", deck);

  const handleCreateCard = async (event) => {
    event.preventDefault();
    await createCard(params.deckId, {
      front: cardFormData.front,
      back: cardFormData.back,
    });
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

  // const addCard = (
  //   <form onSubmit={handleCreateCard}>
  //     <div className="mb-3">
  //       <label htmlFor="front" className="form-label">
  //         Front
  //       </label>
  //       <input
  //         id="front"
  //         name="front"
  //         type="text"
  //         className="form-control"
  //         value={cardFormData.front}
  //         onChange={handleCardFormChange}
  //         placeholder="Enter the card front here"
  //         required
  //       />
  //     </div>
  //     <div className="mb-3">
  //       <label htmlFor="back" className="form-label">
  //         Back
  //       </label>
  //       <textarea
  //         id="back"
  //         name="back"
  //         className="form-control"
  //         value={cardFormData.back}
  //         onChange={handleCardFormChange}
  //         placeholder="Enter the card back here"
  //         rows="4"
  //         required
  //       />
  //     </div>
  //     <Link to={`/decks/${deck.id}`} className="btn btn-secondary">
  //       Cancel
  //     </Link>
  //     <button
  //       type="submit"
  //       className="btn btn-primary"
  //       style={{ margin: "0 10px" }}
  //     >
  //       Submit
  //     </button>
  //   </form>
  // );

  const breadcrumb = (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to={`/decks/${params.deckId}`}> {deck.name} </Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Add Card
        </li>
      </ol>
    </nav>
  );

  console.log("deck::::", deck);

  return (
    <React.Fragment>
      {breadcrumb}
      <h3>{deck.name}: Add Card</h3>
      <CardForm
        cardData={cardFormData}
        handleChange={handleCardFormChange}
        handleSubmit={handleCreateCard}
        deck={deck}
      />
    </React.Fragment>
  );
}
