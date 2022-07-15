import React, { useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import LoadDecks from "./LoadDecks";
import StudyDeck from "./StudyDeck";
import CreateDeck from "./CreateDeck";

function Layout() {
  const [decks, setDecks] = useState([]);

  return (
    <React.Fragment>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Link
              to="/decks/new"
              type="button"
              className="btn btn-secondary"
              style={{ margin: "5, 0 px" }}
            >
              Create Deck
            </Link>
            <LoadDecks decks={decks} setDecks={setDecks} />
          </Route>

          <Route path="/decks/new">
            <CreateDeck decks={decks} />
          </Route>

          <Route path="/decks/:deckId">
            <StudyDeck decks={decks} setDecks={setDecks} />
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
