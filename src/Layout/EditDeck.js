import React, { useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";

export default function EditDeck({ deck, setDeck, decks, setDecks }) {
  const initialFormState = {
    name: deck.name,
    description: deck.description,
  };
  const [formData, setFormData] = useState(initialFormState);

  const { url } = useRouteMatch();

  const breadcrumb = (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to={`${url}`}> {formData.name} </Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Edit Deck
        </li>
      </ol>
    </nav>
  );

  const handleEditDeck = (event) => {
    event.preventDefault();
    setDeck({
      ...deck,
      name: formData.name,
      description: formData.description,
    });

    const decksCopy = decks;
    const filtered = decksCopy.filter((deckCopy) => deckCopy.id !== deck.id);

    console.log("filter", filtered);

    setDecks([
      ...filtered,
      { name: formData.name, description: formData.description, id: deck.id },
    ]);
    console.log("name", formData.name, "desc", formData.description);
  };

  // go through decks array
  // extract old deck at id
  // replace old deck with new deck
  // insert new deck into decks array

  const handleFormChange = (event) => {
    event.preventDefault();
    setFormData({
      ...initialFormState,
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const editDeckForm = (
    <form onSubmit={handleEditDeck}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          {" "}
          Name{" "}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          className="form-control"
          value={formData.name}
          onChange={handleFormChange}
          placeholder="Enter the deck name here"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          {" "}
          Description{" "}
        </label>
        <textarea
          id="description"
          name="description"
          className="form-control"
          value={formData.description}
          onChange={handleFormChange}
          placeholder="Enter the deck description here"
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
    <React.Fragment>
      <div>{breadcrumb}</div>
      <h1>Edit Deck</h1>
      <div>{editDeckForm}</div>
    </React.Fragment>
  );
}