import React, { useState, useEffect } from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { updateDeck, readDeck } from "../utils/api/index";
import DeckForm from "./DeckForm";

export default function EditDeck({ deck, setDeck, decks, setDecks }) {
  const history = useHistory();
  const initialFormState = {
    name: deck.name,
    description: deck.description,
  };
  const [editDeckFormData, setEditDeckFormData] = useState(initialFormState);

  const { params } = useRouteMatch();

  useEffect(() => {
    const abortController = new AbortController();
    async function getDeck() {
      try {
        const fetchedDeck = await readDeck(params.deckId);
        setEditDeckFormData(fetchedDeck);
      } catch (error) {
        console.error(error);
      }
    }
    getDeck();
    return () => abortController.abort();
  }, [params.deckId]);

  const breadcrumb = (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to={`/decks/${deck.id}`}> {editDeckFormData.name} </Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Edit Deck
        </li>
      </ol>
    </nav>
  );

  const handleEditDeck = async (event) => {
    event.preventDefault();
    await updateDeck({
      ...deck,
      name: editDeckFormData.name,
      description: editDeckFormData.description,
    });
    history.push(`/decks/${deck.id}`);
  };

  // go through decks array
  // extract old deck at id
  // replace old deck with new deck
  // insert new deck into decks array

  const handleFormChange = (event) => {
    event.preventDefault();
    setEditDeckFormData({
      ...initialFormState,
      ...editDeckFormData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <React.Fragment>
      <div>{breadcrumb}</div>
      <h1>Edit Deck</h1>
      <div>
        {" "}
        <DeckForm
          handleChange={handleFormChange}
          handleSubmit={handleEditDeck}
          deckData={editDeckFormData}
        />
      </div>
    </React.Fragment>
  );
}
