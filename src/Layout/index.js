import React, { useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import LoadDecks from "./LoadDecks";
import StudyDeck from "./StudyDeck";
import CreateDeck from "./CreateDeck";

function Layout() {
  const [decks, setDecks] = useState([]);
  const [cards, setCards] = useState([]);

  return (
    <React.Fragment>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Link to="/decks/new" type="button" className="btn btn-secondary">
              Create Deck
            </Link>
            <LoadDecks
              decks={decks}
              cards={cards}
              setDecks={setDecks}
              setCards={setCards}
            />
          </Route>

          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          <Route path="/decks/:deckId">
            <StudyDeck
              decks={decks}
              cards={cards}
              setDecks={setDecks}
              setCards={setCards}
            />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default Layout;
