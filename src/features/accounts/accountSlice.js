const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
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
    default:
      return state;
  }
}
export function deposit(amount) {
  return { type: "account/deposit", payload: Number(amount) };
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
