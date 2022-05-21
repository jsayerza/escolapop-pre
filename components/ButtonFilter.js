export const ButtonFilter = ({ children, handlerClick, active }) => {
  if (active) {
    return (
      <button
        className="relative px-4 py-2 bg-gray-200 font-semibold rounded z-20 duration-200 transition-colors shadow-md hover:bg-gray-100"
        onClick={handlerClick}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      className="relative px-4 py-2 bg-gray-100 font-semibold rounded z-20 duration-200 transition-colors shadow-md hover:bg-gray-200"
      onClick={handlerClick}
    >
      {children}
    </button>
  );
};
