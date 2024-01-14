const initialStateCustomer = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};

export default function customerReducer(state = initialStateCustomer, action) {
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

export function createCustomer(fullName, nationalId) {
  console.log(fullName);
  console.log(nationalId);
  return {
    type: "customer/createCustomer",
    payload: {
      fullName,
      nationalId,
      createdAt: new Date().toLocaleString(),
    },
  };
}

export function updateName(fullName) {
  return { type: "customer/updateName", payload: fullName };
}
