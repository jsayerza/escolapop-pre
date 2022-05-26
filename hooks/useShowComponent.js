import { useState } from "react";

export const useShowComponent = () => {
  const [show, setShow] = useState(false);

  const handleShowComponent = () => {
    setShow(!show);
  };

  return [show, handleShowComponent];
};
