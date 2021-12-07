import React, { createContext, useReducer } from "react";
import { AppReducer } from "./AppReducer.js";

const initialState = {
  transactions: [],
};

const API_URL = "https://node-money-manager.herokuapp.com";

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  async function getTransactions() {
    const transaction_data = await fetch(`${API_URL}/api/transactions`).then(
      (data) => data.json()
    );
    console.log(transaction_data);

    dispatch({
      type: "GET_TRANSACTIONS",
      payload: transaction_data,
    });
  }

  async function deleteTransaction(id) {
    const transaction_data = await fetch(`${API_URL}/api/transactions/${id}`, {
      method: "DELETE",
    });
    console.log(transaction_data);

    dispatch({
      type: "DELETE_TRANSACTION",
      payload: transaction_data,
    });
  }

  async function addTransaction(transaction) {
    const transaction_data = await fetch(`${API_URL}/api/transactions`, {
      method: "POST",
      body: JSON.stringify(transaction),
      headers: { "Content-Type": "application/json" },
    });
    console.log(transaction_data);

    dispatch({
      type: "ADD_TRANSACTION",
      payload: transaction_data,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        getTransactions,
        deleteTransaction,
        addTransaction,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
