import { combineReducers, createStore } from "redux";

import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

// start of Redux-Library

const rootRudercer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootRudercer);
console.log("store connected");
export default store;
