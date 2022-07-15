import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch, Link } from "react-router-dom";
import { readCard, updateCard } from "../utils/api";
import CardForm from "./CardForm";

export default function EditCard({ deck }) {
  const breadcrumb = (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to={`/decks/${deck.id}`}> {deck.name} </Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Edit Card
        </li>
      </ol>
    </nav>
  );

  const [editCardData, setEditCardData] = useState({});
  const { params } = useRouteMatch();
  const history = useHistory();

  // API calls to fetch current deck, then fetch current card
  useEffect(() => {
    const abortController = new AbortController();
    async function getDeck() {
      try {
        const fetchedCard = await readCard(params.cardId);
        setEditCardData(fetchedCard);
      } catch (error) {
        console.error(error);
      }
    }
    getDeck();
    return () => abortController.abort();
  }, [params.deckId, params.cardId]);

  // Handlers for submitting, editing, and cancelling on the card form
  const handleEditCardSubmit = async (event) => {
    event.preventDefault();
    await updateCard(editCardData);
    history.push(`/decks/${params.deckId}`);
  };

  const handleEditCardChange = (event) => {
    event.preventDefault();
    setEditCardData({
      ...editCardData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      {breadcrumb}
      <CardForm
        cardData={editCardData}
        handleChange={handleEditCardChange}
        handleSubmit={handleEditCardSubmit}
        deck={deck}
      />
    </div>
  );
}
