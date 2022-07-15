import React, { useEffect } from "react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import { deleteDeck, readDeck, deleteCard } from "../utils/api";

export default function ViewDeck({ deck, setDeck }) {
  const { url, params } = useRouteMatch();
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
  }, [params.deckId, setDeck]); // add setDeck and cards to dependencies
  

  const handleDeleteDeck = () => {
    const deleteBox = window.confirm(
      "Delete deck? \n \n You will not be able to recover it."
    );
    // if user hits "ok" on popup, code below deletes deck
    if (deleteBox) {
      async function deleteDeckApiCall() {
        try {
          let newDeckList = await deleteDeck(params.deckId);
          history.push("/");
          console.log(newDeckList);
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

  const handleDeleteCard = (cardId) => {
    const deleteBox = window.confirm(
      "Delete card? \n \n You will not be able to recover it."
    );
    // if user hits "ok" on popup, code below deletes card
    if (deleteBox) {
      async function deleteCardApiCall() {
        try {
          let newCardList = await deleteCard(cardId);
          history.push('/')
          history.push(`/decks/${params.deckId}`);
        } catch (error) {
          if (error.name === "AbortError") {
            console.log(error.name);
          } else {
            throw error;
          }
        }
      }

      deleteCardApiCall();
    }



  };

  const cardList = deck.cards.map((card) => (
    <div key={card.id} className="card container">
      <li className="row">
        <div className="col-6">
          <p> {card.front} </p>
        </div>
        <div className="col-6">
          <div>
            <p>{card.back}</p>
          </div>
          <div
            className="row"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Link
              to={`${url}/cards/${card.id}/edit`}
              className="btn btn-secondary"
            >
              Edit
            </Link>
            <button className="btn btn-danger" onClick={() => handleDeleteCard(card.id)}>
              Delete
            </button>
          </div>
        </div>
      </li>
    </div>
  ));

  const selectedDeck = (
    <div className="container column">
      <div className="column">
        <h3> {deck.name} </h3>
        <p> {deck.description}</p>
      </div>
      <div
        className="row"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div className="row">
          <Link
            to={`${url}/edit`}
            className="btn btn-secondary"
            style={{ margin: "0 10px" }}
          >
            Edit
          </Link>
          <Link
            to={`${url}/study`}
            className="btn btn-primary"
            style={{ margin: "0 10px" }}
          >
            Study
          </Link>
          <Link
            to={`${url}/cards/new`}
            className="btn btn-primary"
            style={{ margin: "0 10px" }}
          >
            Add Cards
          </Link>
        </div>
        <div>
          <button
            type="delete"
            className="btn btn-danger"
            onClick={handleDeleteDeck}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  const breadcrumb = (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          {deck.name}
        </li>
      </ol>
    </nav>
  );

  return (
    <React.Fragment>
      {/* <Switch>
            <Route exact path={`${path}/edit`}>
                <EditDeck />
            </Route>
            <Route path={`${path}/cards/new`}>
                <CreateCard />
            </Route>
            <Route path={`${path}/cards/:cardId/edit`} >
                <EditCard />
            </Route>
        </Switch> */}
      {breadcrumb}
      {selectedDeck}
      <h2>Cards</h2>
      <ul>{cardList}</ul>
    </React.Fragment>
  );
}
