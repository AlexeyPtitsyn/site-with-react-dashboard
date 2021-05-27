/**
 * @file Root reducer.
 * @copyright Alexey Ptitsyn <numidium.ru@gmail.com>, 2021.
 */
const initialState = {
  isLoggedIn: true
};

export const rootReducer = (state = initialState, action) => {

  switch(action.type) {

    case 'LOGIN': {
      return { ...state, isLoggedIn: action.payload };
    }

  } // switch

  return state;
};
