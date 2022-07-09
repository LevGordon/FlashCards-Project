import React, { useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { updateCard, readCard } from "../utils/api/index";


export default function EditCard({ deck }) {
    const { url, params } = useRouteMatch();
    const currentCard = deck.cards.map((card)=>{
        return card
      })
    console.log("🚀 ~ currentCard", currentCard)
const filtered = currentCard.filter((card)=>card.id==params.cardId)
console.log("🚀 ~ params.cardId", params.cardId)
console.log("🚀 ~ filtered", filtered)


    console.log("🚀 ~ deck", deck.cards.front)
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
              Edit Card
            </li>
          </ol>
        </nav>
      );

// let card = await 



      let initialCardForm = {
        front: filtered[0].front,
        back: filtered[0].back,
      };

      const [cardEditData, setCardEditData] = useState(initialCardForm);

      const handleEditCard = async (event) => {
        event.preventDefault();
        await updateCard( {
          front: cardEditData.front,
          back: cardEditData.back,
          id: params.cardId
        });
        console.log("hello world");
        setCardEditData(initialCardForm);
      };
    
      const handleEditFormChange = (event) => {
        event.preventDefault();
        setCardEditData({
          ...initialCardForm,
          ...cardEditData,
          [event.target.name]: event.target.value,
        });
      };



      const addCard = (
        <form onSubmit={handleEditCard}>
          <div className="mb-3">
            <label htmlFor="front" className="form-label">
              {" "}
              Front{" "}
            </label>
            <input
              id="front"
              name="front"
              type="text"
              className="form-control"
              value={cardEditData.front}
              onChange={handleEditFormChange}
              placeholder="Enter the card front here"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="back" className="form-label">
              {" "}
              Back{" "}
            </label>
            <textarea
              id="back"
              name="back"
              className="form-control"
              value={cardEditData.back}
              onChange={handleEditFormChange}
              placeholder="Enter the card back here"
              rows="4"
              required
            />
          </div>
          <Link to={`/decks/${deck.id}`} className="btn btn-secondary">
            Cancel
          </Link>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ margin: "0 10px" }}
          >
            Submit
          </button>
        </form>
      );


    return (<div>
    {breadcrumb}
    {addCard}
    </div>
    )
}