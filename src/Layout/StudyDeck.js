import React, { useState } from "react";
import { useRouteMatch, Route, Switch, Link } from "react-router-dom";
import LoadCards from "./LoadCards";
import ViewDeck from "./ViewDeck";
import CreateCard from "./CreateCard";
import EditCard from "./EditCard";
import EditDeck from "./EditDeck";

export default function Deck({ decks, setDecks }) {
  const { params, path, url } = useRouteMatch();
  const [deck, setDeck] = useState({ cards: [] });

  const breadcrumb = (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to={`${url}`}> {deck.name} </Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Data
        </li>
      </ol>
    </nav>
  );

  return (
    <React.Fragment>
      <Switch>
        <Route exact path={`${path}`}>
          <ViewDeck
            deck={deck}
            setDeck={setDeck}
            setDecks={setDecks}
          />
        </Route>

        <Route path={`${path}/study`}>
          {breadcrumb}
          <h2>{`${deck.name}`}: Study </h2>
          <LoadCards
            params={params}
            deck={deck}
            setDeck={setDeck}
            path={path}
          />
        </Route>
        <Route exact path={`${path}/edit`}>
          <EditDeck
            deck={deck}
            setDeck={setDeck} 
            decks={decks}
            setDecks={setDecks}
          />
        </Route>
        <Route path={`${path}/cards/new`}>
          <CreateCard deck={deck}/>
        </Route>
        <Route path={`${path}/cards/:cardId/edit`}>
          <EditCard deck={deck} />
        </Route>
      </Switch>
    </React.Fragment>
  );
}