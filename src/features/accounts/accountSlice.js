const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      console.log(action.payload);
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };

    case "account/requestLoan":
      if (state.loan > 0) return state;
      //   later
      return {
        ...state,
        loan: Number(action.payload.loan),
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.loan,
      };
    case "account/payLoan":
      console.log(state);

      //   later
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    case "account/convertingCurrency":
      return { ...state, isLoading: true };
    default:
      return state;
  }
}
export function deposit(amount, currency) {
  if (currency === "USD")
    return { type: "account/deposit", payload: Number(amount) };
  return async function (dispatch, getState) {
    // { type: "account/deposit", payload: Number(amount) }
    // API call
    dispatch({ type: "account/convertingCurrency" });
    const host = "api.frankfurter.app";
    const res = await fetch(
      `https://${host}/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    const coverted = data.rates.USD;
    console.log(coverted);
    // return action
    return dispatch({ type: "account/deposit", payload: Number(coverted) });
  };
}
export function withDraw(amount) {
  return { type: "account/withdraw", payload: Number(amount) };
}
export function requestLoan(loan, purpose) {
  return { type: "account/requestLoan", payload: { loan, purpose } };
}
export function payloan(amount) {
  console.log(amount);
  return { type: "account/payLoan", payload: Number(amount) };
}
