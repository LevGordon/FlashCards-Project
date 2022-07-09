import React from "react";

export default function CreateDeck() {
  return (
    <React.Fragment>
      <h1>Create Deck </h1>
      <div className="mb-3">
        <label for="exampleFormControlInput1" className="form-label">
          Name
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Deck Name"
        />
      </div>
      <div className="mb-3">
        <label for="exampleFormControlTextarea1" className="form-label">
          Description
        </label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          placeholder="Brief description of deck"
        ></textarea>
      </div>
      <button type="button" class="btn btn-secondary">
        Secondary
      </button>
      <button
        type="button"
        class="btn btn-primary"
        style={{ margin: "0 10px" }}
      >
        Primary
      </button>
    </React.Fragment>
  );
}