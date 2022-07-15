import React, { useEffect, useState } from "react";
import { readDeck } from "../utils/api";
import { useHistory, Link } from "react-router-dom";

export default function LoadCards({ params, deck, setDeck, path }) {
  const [cardIndex, setCardIndex] = useState(0);
  const [cardSide, setCardSide] = useState(true);

  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    async function fetchDeck() {
      try {
        let fetchedDeck = await readDeck(params.deckId);
        setDeck(fetchedDeck);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log(error.name);
        } else {
          throw error;
        }
      }
    }
    fetchDeck();
    return () => {
      abortController.abort();
    };
  }, [params.deckId, setDeck]);
  console.log("deck", deck.cards);

  const card = deck.cards[cardIndex] || {};

  const handleNext = () => {
    if (cardIndex < deck.cards.length - 1) {
      setCardIndex(cardIndex + 1);
    } else if (cardIndex === deck.cards.length - 1) {
      const restart = window.confirm(
        "Restart cards? \n \n Click 'cancel' to return to the home page."
      );

      restart ? setCardIndex(0) : history.push("/");
    }

    setCardSide(!cardSide);
  };

  const notEnough = (
    <div>
      <h4>Not enough cards.</h4>
      <p>
        You need at least 3 cards to study. There{" "}
        {deck.cards.length === 0 || deck.cards.length === 1 ? "is" : "are"}{" "}
        {`${deck.cards.length}`}{" "}
        {deck.cards.length === 0 || deck.cards.length === 1 ? "card" : "cards"}{" "}
        in this deck.
      </p>
      <Link to={`${path}/cards/new`} className="btn btn-primary">
        Add Cards
      </Link>
    </div>
  );

  const pageCard = (
    <div key={card.id} className="card w-50">
      <div className="card-body">
        <div
          className="row"
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "0 10px",
          }}
        >
          <p>
            {" "}
            Card {cardIndex + 1} of {deck.cards.length}{" "}
          </p>
        </div>
        <p className="card-text">{cardSide ? card.front : card.back}</p>
        <div
          className="row"
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "0 10px",
          }}
        >
          <div className="row" style={{ display: "flex", margin: "0 5px" }}>
            <button
              className="btn btn-secondary"
              onClick={() => setCardSide(!cardSide)}
            >
              Flip
            </button>
            {!cardSide && (
              <button onClick={handleNext} className="btn btn-primary">
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <React.Fragment>
      {deck.cards.length <= 2 ? notEnough : pageCard}
    </React.Fragment>
  );
}
