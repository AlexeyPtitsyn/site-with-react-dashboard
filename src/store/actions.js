/**
 * @file Redux actions.
 * @copyright Alexey Ptitsyn <numidium.ru@gmail.com>, 2021.
 */
export const login = () => {
  return {
    type: 'LOGIN',
    payload: true
  };
};

export const logout = () => {
  return {
    type: 'LOGIN',
    payload: false
  };
};
