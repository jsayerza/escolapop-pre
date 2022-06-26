import clsx from "clsx";

export const BadgeSaleStatus = ({ status }) => {
  const classNamesDnD = clsx(
    //"rounded-full font-lato font-bold bg-greenescola px-2 md:px-3 py-1 text-xs md:text-md md: text-white",
    "rounded-full font-lato font-bold bg-greenescola px-3 py-1 text-white",

    {
      ["bg-greenescola"]: status === "En venda",
      ["bg-orangeAMPA"]: status === "Reservat",
      ["bg-blue-400"]: status === "Venut",
      ["bg-red-500"]: status === "Cancel·lat",
    }
  );

  return <span className={classNamesDnD}>{status}</span>;
};
