export const Modal = ({ children, isOpen, closeModal }) => {
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className={`${
        isOpen ? "fixed" : "hidden"
      } top-16 bottom-0 left-0 right-0 p-4 z-20 bg-[#ffffffba]`}
      onClick={closeModal}
    >
      <div
        className="z-30 absolute top-40 left-10 grid justify-center items-center gap-2 w-2/4 p-2 bg-white shadow-xl rounded"
        onClick={handleModalClick}
      >
        {children}
      </div>
    </div>
  );
};
