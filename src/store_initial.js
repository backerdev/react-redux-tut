// write pure redux code
// Model Bank account

import { combineReducers, createStore } from "redux";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};
const initialStateCustomer = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};

function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };

    case "account/requestLoan":
      if (state.loan > 0) return;
      //   later
      return {
        ...state,
        loan: action.payload.loan,
        loanPurpose: action.payload.loanPurpose,
        balance: state.balance + action.payload.loan,
      };
    case "account/payLoan":
      if (state.loan > 0) return;
      //   later
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    default:
      return state;
  }
}

// Reducer should be pure functions without side-effects

function customerReducer(state = initialStateCustomer, action) {
  // should not have side effects in reducer
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalId: action.payload.nationalId,
        createdAt: action.payload.createdAt,
      };

    case "customer/updateName":
      return { ...state, fullName: action.payload };

    default:
      return state;
  }
}

function createCustomer(fullname, nationalId) {
  return {
    type: "customer/createCustomer",
    payload: {
      fullname,
      nationalId,
      createdAt: new Date().toLocaleString(),
    },
  };
}

function updateName(fullName) {
  return { type: "customer/updateName", payload: fullName };
}

// start of Redux-Library

const rootRudercer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootRudercer);

console.log("hello Redux");

// store.dispatch({
//   type: "account/requestLoan",
//   payload: { loan: 5000, loanPurpose: "Buy a new Car" },
// });

// Action creators-Redux can work without it

function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}
function withDraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
function requestLoan(loan, purpose) {
  return { type: "account/requestLoan", payload: { loan, purpose } };
}
function payloan(amount) {
  return { type: "account/payloan", payload: amount };
}
payloan(5000);
store.dispatch(createCustomer("Mohamed Abu", "S8971664A"));
console.log(store.getState());
