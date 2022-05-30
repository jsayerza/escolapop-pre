import clsx from "clsx";

export const BadgeStatus = ({ status }) => {
  const classNamesDnD = clsx(
    "rounded-full font-lato font-bold bg-greenescola px-3 py-1 text-white",
    {
      ["bg-green-400"]: status === "Bon estat",
      ["bg-green-300"]: status === "Usat. Estat acceptable",
      ["bg-yellow-500"]: status === "Deteriorat. Necessita manteniment",
      ["bg-orange-500"]: status === "No funciona. Per a peces",
    }
  );

  return <span className={classNamesDnD}>{status}</span>;
};
