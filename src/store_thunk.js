import { applyMiddleware, combineReducers, createStore } from "redux";

import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

// Devtools

// start of Redux-Library

const rootRudercer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(
  rootRudercer,
  composeWithDevTools(applyMiddleware(thunk))
);
console.log("store connected");
export default store;
