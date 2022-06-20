import { useActiveFilters } from "hooks/useActiveFilters";
import { useHandlersFilters } from "hooks/useHandlersFilters";
import { useModal } from "hooks/useModal";
import { Modal } from "./Modal";
import { BsArrowUpRight, BsArrowDownLeft } from "react-icons/bs";

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
        ordernar
      </button>
      <Modal isOpen={open} closeModal={handleCloseOrderModal} center={false}>
        <div className="h-full w-full flex flex-col gap-2">
          <button
            className="flex gap-2 items-center bg-slate-100 px-4 py-4 rounded font-semibold"
            onClick={() => handleOrder("max_price")}
          >
            <BsArrowUpRight size="2rem" />
            Ordenar mas caros
          </button>
          <button
            className="flex gap-2 items-center bg-slate-100 px-4 py-4 rounded font-semibold"
            onClick={() => handleOrder("min_price")}
          >
            <BsArrowDownLeft size="2rem" />
            Ordenar mas baratos
          </button>
        </div>
      </Modal>
    </div>
  );
};
