import React from "react";
import { Route, Switch, useParams } from "react-router-dom";
import LoadCards from "./LoadCards";

export default function Study({ cards, decks, deck, setDeck }) {
  const params = useParams();

  console.log(params);
  console.log(cards);

  return (
    <React.Fragment>
      <h4> Study: {`${decks[params.deckId].name}`} </h4>
      <Switch>
        <Route>
          <LoadCards
            cards={cards}
            decks={decks}
            params={params}
            deck={deck}
            setDeck={setDeck}
          />
        </Route>
      </Switch>
    </React.Fragment>
  );
}
