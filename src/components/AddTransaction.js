import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export function AddTransaction() {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState(0);

  const { addTransaction } = useContext(GlobalContext);

  const onSubmit = (add) => {
    add.preventDefault();

    const newTransaction = {
      id: Math.floor(Math.random() * 1000),
      text,
      amount: +amount,
    };

    addTransaction(newTransaction);
  };

  return (
    <div>
      <h3>Add new Transaction</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input
            type="text"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Enter details"
          />
        </div>
        <div className="form-control">
          <label htmlFor="text">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            placeholder="Enter Amount"
          />
        </div>
        <button className="btn">Add Transaction</button>
      </form>
    </div>
  );
}
