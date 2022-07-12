import React from "react";
import { Link } from "react-router-dom";

// Component that renders the form for editing or creating a new card

export default function CardForm({

  handleSubmit,
  handleChange,
  cardData,
  deck
}) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="front" className="form-label">
          Front
        </label>
        <textarea
          id="front"
          name="front"
          className="form-control"
          value={cardData.front}
          onChange={handleChange}
          placeholder={cardData.front}
          rows="4"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="back" className="form-label">
          Back
        </label>
        <textarea
          id="back"
          name="back"
          className="form-control"
          value={cardData.back}
          onChange={handleChange}
          placeholder={cardData.back}
          rows="4"
          required
        />
      </div>
      <Link to={`/decks/${deck.id}`} className="btn btn-secondary">
        Done
      </Link>
      <button
        className="btn btn-primary"
        style={{ margin: "0 10px" }}
      >
        Save
      </button>
    </form>
  );
}