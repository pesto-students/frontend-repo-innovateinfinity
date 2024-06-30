// import {
//   ADD_TO_CART,
//   DELETE_FROM_CART,
//   UPDATE_CART
// } from '../actions/types';

// const initialState = JSON.parse(localStorage.getItem('cartItems')) ?? [];

// function cartReducer(state = initialState, action) {
//   const { type, payload } = action;

//   switch (type) {
//     case ADD_TO_CART:
//       localStorage.setItem('cartItems', JSON.stringify(state.concat([payload])));
//       return [...state, payload];
//     case UPDATE_CART:
//       localStorage.setItem('cartItems', JSON.stringify([...state.filter((d) => d.key !== payload.key)].concat([payload])));
//       return [...state.filter((d) => d.key !== payload.key), payload];
//     case DELETE_FROM_CART:
//       localStorage.setItem('cartItems', JSON.stringify(state.filter((d) => d.key !== payload)));
//       return [...state.filter((d) => d.key !== payload)]
//     default:
//       return state;
//   }
// }

// export default cartReducer;
