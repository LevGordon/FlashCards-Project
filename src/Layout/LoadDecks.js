import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteDeck, listDecks } from "../utils/api";

function LoadDecks({ decks, setDecks }) {
  async function getDecks(abortController) {
    try {
      const fetchedDeckList = await listDecks(abortController.signal);
      setDecks(fetchedDeckList);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const abortController = new AbortController();
    getDecks(abortController);

    return () => {
      abortController.abort();
    };
  }, [setDecks]);

  const handleDeleteDeck = (deck) => {
    const deleteBox = window.confirm(
      "Delete deck? \n \n You will not be able to recover it."
    );
    // if user hits "ok" on popup, code below deletes deck
    if (deleteBox) {
      async function deleteDeckApiCall() {
        try {
          await deleteDeck(deck.id);
          const abortController = new AbortController();
          await getDecks(abortController);
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
    <div className="row" style={{ margin: "5 0px" }}>
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
            <p> {deck.cards.length} cards</p>
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
                onClick={() => handleDeleteDeck(deck)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));

  return <div>{deckList}</div>;
}

export default LoadDecks;
