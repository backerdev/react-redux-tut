import { configureStore } from "@reduxjs/toolkit";

import accountReducer from "./features/accounts/accountSliceReduxtoolkit";
import customerReducer from "./features/customers/customerSlice_reduxtoolkit";

const store = configureStore({
  reducer: { account: accountReducer, customer: customerReducer },
});

export default store;
