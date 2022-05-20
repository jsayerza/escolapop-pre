export const Modal = ({ children, isOpen, closeModal }) => {
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className={`${
        isOpen ? "fixed" : "hidden"
      } top-[70px] bottom-0 left-0 right-0 p-4 z-10 bg-[#ffffffba]`}
      onClick={closeModal}
    >
      <div
        className="z-20 absolute top-40 left-10 grid justify-center items-center w-2/4 h-2/4 bg-white shadow-xl rounded"
        onClick={handleModalClick}
      >
        {children}
      </div>
    </div>
  );
};
