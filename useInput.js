import { useReducer } from "react";

const initialState = {
  value: "",
  isTouched: false,
};

const inputReducer = (state, action) => {
  if (action.type === "INPUT") {
    return { value: action.value, isTouched: state.isTouched };
  }
  if (action.type === "BLUR") {
    return { value: state.value, isTouched: true };
  }
  if (action.type === "RESET") {
    return { value: "", isTouched: false };
  }
  return inputReducer;
};

const useInput = (ifInputValid) => {
  const [inputState, dispatch] = useReducer(inputReducer, initialState);

  const inputIsValid = ifInputValid(inputState.value);
  const inValid = !inputIsValid && inputState.isTouched;

  const changeHandeler = (event) => {
    dispatch({ type: "INPUT", value: event.target.value });
  };
  const blurHandeler = () => {
    dispatch({ type: "BLUR" });
  };
  const reset = () => {
    dispatch({ type: "RESET" });
  };

  return {
    inputValue: inputState.value,
    inValid,
    inputIsValid,
    changeHandeler,
    blurHandeler,
    reset,
  };
};

export default useInput;
