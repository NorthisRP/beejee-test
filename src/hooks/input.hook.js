import { useState } from "react";

export const useInput = (initial) => {
  const [value, setValue] = useState(initial);
  const [error, setError] = useState(false);

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    bind: { value, onChange },
    value,
    error,
    setError,
  };
};
