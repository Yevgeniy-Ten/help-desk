import { useReducer } from "react";

export const useToggle = (initialValue = false) => {
  // eslint-disable-next-line arrow-body-style
  return useReducer((state) => !state, initialValue);
};
