import { useActiveFilters } from "hooks/useActiveFilters";
import { useHandlersFilters } from "hooks/useHandlersFilters";
import { useModal } from "hooks/useModal";
import { Modal } from "./Modal";
import { BsArrowUpRight, BsArrowDownLeft } from "react-icons/bs";
import { GiClothes } from "react-icons/gi";
import { FaPencilAlt } from "react-icons/fa";

export const OrderButton = ({ queryObj, keyword }) => {
  const [open, handleModal, handleCloseOrderModal] = useModal();
  const [activeOrder, setActiveOrder] = useActiveFilters();
  const { handleOrder } = useHandlersFilters({
    queryObj,
    setActiveOrder,
    handleCloseOrderModal,
    keyword,
  });

  return (
    <div>
      <button
        className="relative rounded-xl bg-slate-100 font-semibold py-2 px-4 shadow-md"
        onClick={handleModal}
      >
        Ordenar resultats
      </button>
      <Modal isOpen={open} closeModal={handleCloseOrderModal} center={false}>
        <div className="h-full w-full flex flex-col gap-2">
          <button
              className="flex gap-2 items-center bg-slate-100 px-4 py-4 rounded font-semibold"
              onClick={() => handleOrder("min_price")}
            >
              <BsArrowDownLeft size="2rem" />
              De más barat a més car
          </button>
          <button
            className="flex gap-2 items-center bg-slate-100 px-4 py-4 rounded font-semibold"
            onClick={() => handleOrder("max_price")}
          >
            <BsArrowUpRight size="2rem" />
            De més car a més barat
          </button>
          <button
            className="flex gap-2 items-center bg-slate-100 px-4 py-4 rounded font-semibold"
            onClick={() => handleOrder("max_size")}
          >
            <GiClothes size="2rem" />
            De talla gran a petita
          </button>
          <button
            className="flex gap-2 items-center bg-slate-100 px-4 py-4 rounded font-semibold"
            onClick={() => handleOrder("min_size")}
          >
            <GiClothes size="2rem" />
            De talla petita a gran
          </button>
          <button
            className="flex gap-2 items-center bg-slate-100 px-4 py-4 rounded font-semibold"
            onClick={() => handleOrder("min_course")}
          >
            <FaPencilAlt size="2rem" />
            De curs menor a major
          </button>
          <button
            className="flex gap-2 items-center bg-slate-100 px-4 py-4 rounded font-semibold"
            onClick={() => handleOrder("max_course")}
          >
            <FaPencilAlt size="2rem" />
            De curs major a menor
          </button>
        </div>
      </Modal>
    </div>
  );
};
