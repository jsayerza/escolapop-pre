import { useState } from "react";

export const useActiveFilters = () => {
  const [active, setActive] = useState(false);

  return [active, setActive];
};
