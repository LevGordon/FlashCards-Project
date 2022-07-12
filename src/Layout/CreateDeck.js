import React, {useState} from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api/";
import DeckForm from "./DeckForm";

  export default function CreateDeck() {
    const initialForm = {
      name: "",
      description: "",
    };
    const [createDeckFormData, setCreateDeckFormData] = useState({
      ...initialForm,
    });
  
    const history = useHistory();
  
    // Handlers for submitting, editing, and cancelling on the deck form
    const handleCreateDeckChange = (event) => {
      setCreateDeckFormData({
        ...createDeckFormData,
        [event.target.name]: event.target.value,
      });
    };
  
    const handleCreateDeckSubmit = async (event) => {
      event.preventDefault();
      const newDeck = await createDeck(createDeckFormData);
      const newDeckId = newDeck.id;
      history.push(`/decks/${newDeckId}`);
    };
  
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
  

    return (
      <React.Fragment>
        {breadcrumb}
        <h1>Create Deck </h1>
        <DeckForm
          handleChange={handleCreateDeckChange}
          handleSubmit={handleCreateDeckSubmit}
          deckData={createDeckFormData}
        />
      </React.Fragment>
    );
  }
