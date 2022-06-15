import { RiArrowDropDownLine } from "react-icons/ri";
import { IoIosCloseCircleOutline, IoIosCloseCircle } from "react-icons/io";
import clsx from "clsx";

export const ButtonFilter = ({ children, handlerClick, active, isOpen }) => {
  const classesActive = clsx(
    "relative flex gap-2 px-4 py-2 bg-gray-200 font-lato font-normal rounded duration-200 transition-colors shadow-md hover:bg-gray-100",
    {
      ["z-30"]: isOpen === true,
      ["z-10"]: isOpen === false,
    }
  );

  const classNames = clsx(
    `relative flex gap-2 px-4 py-2 bg-gray-100 font-lato font-normal rounded duration-200 transition-colors shadow-md hover:bg-gray-200`,
    {
      ["z-30"]: isOpen === true,
      ["z-10"]: isOpen === false,
    }
  );

  if (active) {
    return (
      <button className={classesActive} onClick={handlerClick}>
        {children}
        <span className="text-gray-400">
          <IoIosCloseCircle size={"1.5rem"} />
        </span>
      </button>
    );
  }

  return (
    <button className={classNames} onClick={handlerClick}>
      {children}
      <span className="text-gray-400">
        <RiArrowDropDownLine size={"1.5rem"} />
      </span>
    </button>
  );
};
