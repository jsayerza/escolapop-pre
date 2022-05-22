import clsx from "clsx";

export const ButtonFilter = ({ children, handlerClick, active, isOpen }) => {
  const classesActive = clsx(
    "relative px-4 py-2 bg-gray-200 font-semibold rounded duration-200 transition-colors shadow-md hover:bg-gray-100",
    {
      ["z-30"]: isOpen === true,
      ["z-10"]: isOpen === false,
    }
  );

  const classNames = clsx(
    `relative px-4 py-2 bg-gray-100 font-semibold rounded duration-200 transition-colors shadow-md hover:bg-gray-200`,
    {
      ["z-30"]: isOpen === true,
      ["z-10"]: isOpen === false,
    }
  );

  if (active) {
    return (
      <button className={classesActive} onClick={handlerClick}>
        {children}
      </button>
    );
  }

  return (
    <button className={classNames} onClick={handlerClick}>
      {children}
    </button>
  );
};
