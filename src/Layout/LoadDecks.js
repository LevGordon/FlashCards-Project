import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteDeck } from "../utils/api";


function LoadDecks({ decks, setDecks, cards, setCards }) {

async function getDecks(abortController) {
  try {
    const response = await fetch("http://localhost:8080/decks", {
      signal: abortController.signal,
    });
    const data = await response.json();
    setDecks(data);
  } catch (error) {
    if (error.name === "AbortError") {
      console.log(error.name);
    } else {
      throw error;
    }
  }
}


  useEffect(() => {
    const abortController = new AbortController();

    

    getDecks(abortController);

    return () => {
      abortController.abort();
    };
  }, [setDecks]);

  useEffect(() => {
    const abortController = new AbortController();

    async function getCards() {
      try {
        const response = await fetch("http://localhost:8080/cards", {
          signal: abortController.signal,
        });
        const data = await response.json();
        setCards(data);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log(error.name);
        } else {
          throw error;
        }
      }
    }

    getCards();

    return () => {
      abortController.abort();
    };
  }, [setCards]);

  const handleDeleteDeck = (deck) => {
    const deleteBox = window.confirm(
      "Delete deck? \n \n You will not be able to recover it."
    );
    // if user hits "ok" on popup, code below deletes deck
    if (deleteBox) {
      console.log("please Delete deck");
      async function deleteDeckApiCall() {
        try {
         await deleteDeck(deck.id);
         const abortController = new AbortController();
         await getDecks(abortController)
        } catch (error) {
          if (error.name === "AbortError") {
            console.log(error.name);
          } else {
            throw error;
          }
        }
      }

      deleteDeckApiCall();
    }
  };

  
// Homepage HTML
  const deckList = decks.map((deck) => (
    <div key={deck.id} className="card w-50">
      <div className="card-body">
        <div
          className="row"
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "0 10px",
          }}
        >
          <h5 className="card-title"> {deck.name} </h5>
          <p> {cards.filter((card) => card.deckId === deck.id).length} cards</p>
        </div>
        <p className="card-text">{deck.description}</p>
        <div
          className="row"
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "0 10px",
          }}
        >
          <div className="row" style={{ display: "flex", margin: "0 5px" }}>
            <Link to={`/decks/${deck.id}`} className="btn btn-secondary">
              View
            </Link>
            <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">
              Study
            </Link>
          </div>
          <div>
            <button
              type="delete"
              className="btn btn-danger"
              onClick={()=>handleDeleteDeck(deck)}
              
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  ));

  return deckList;
}

export default LoadDecks;