import { useActiveFilters } from "hooks/useActiveFilters";
import { useHandlersFilters } from "hooks/useHandlersFilters";
import { useModal } from "hooks/useModal";
import { Modal } from "./Modal";

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
      <Modal isOpen={open} closeModal={handleCloseOrderModal}>
        <button
          className="bg-slate-400 px-4 py-2 rounded"
          onClick={() => handleOrder("max_price")}
        >
          Ordenar mas caros
        </button>
        <button
          className="bg-slate-400 px-4 py-2 rounded"
          onClick={() => handleOrder("min_price")}
        >
          Ordenar mas baratos
        </button>
      </Modal>
    </div>
  );
};
