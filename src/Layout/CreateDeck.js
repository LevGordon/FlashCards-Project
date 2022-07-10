import React, {useState} from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api/index";

export default function CreateDeck({decks}) {

  const breadcrumb = (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Create Deck
        </li>
      </ol>
    </nav>
  );

  const history = useHistory()

  const initialDeckForm = {
    name: "",
    description: ""
  }

  const [deckFormData, setDeckFormData] = useState(initialDeckForm);

  const handleCreateDeck = async (event) => {
    event.preventDefault();
    await createDeck({
      // id: parseInt(`${decks[decks.length + 1]}`),
      name: deckFormData.name,
      description: deckFormData.description,
    });
    console.log("hello world");
    setDeckFormData(initialDeckForm);
    // history.push(`/decks/${decks[decks.length]}`)
  };

  const handleDeckFormChange = (event) => {
    event.preventDefault();
    setDeckFormData({
      ...initialDeckForm,
      ...deckFormData,
      [event.target.name]: event.target.value,
    });
    console.log(deckFormData)
  };

  const addDeck = (
    <form onSubmit={handleCreateDeck}>
      <h1>Create Deck </h1>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          name="name"
          className="form-control"
          id="name"
          placeholder="Deck Name"
          value={deckFormData.name}
          onChange={handleDeckFormChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          name="description"
          className="form-control"
          id="description"
          rows="3"
          placeholder="Brief description of deck"
          value={deckFormData.description}
          onChange={handleDeckFormChange}
          required
        ></textarea>
      </div>
      <Link to="/" type="button" className="btn btn-secondary">
        Cancel
      </Link>
      <button
        type="button"
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
      {addDeck}
    </div>

  )
}