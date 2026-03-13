import Button from "./Button";
import SearchableDropdown from "./SearchableDropdown";
import useOrderStore from "../../../store/admin/useOrderStore";
import toast from "react-hot-toast";
import { X } from "lucide-react";

export default function AssignCourier({ onClose, isOpen, orderId }) {
  const selectedCourier = useOrderStore((state) => state.selectedCourier);
  const setCourier = useOrderStore((state) => state.setCourier);
  const clearCourier = useOrderStore((state) => state.clearCourier);

  if (!isOpen) return null;

  const handleCourierConfirm = () => {
    if (!selectedCourier) {
      toast.error("Select a courier!");
      return;
    } 
    setCourier(selectedCourier, orderId)

    toast.success("Courier added successfully, status updated!");
    onClose();
  };

  const handleCancel = () => {
    clearCourier();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={handleCancel} />
      <div className="bg-white w-full max-w-md rounded-[24px] shadow-xl z-10">
        <div className="p-6 flex w-full flex-col items-start gap-4">
          <button  className="self-end hover:bg-orange-600 hover:text-white p-2 cursor-pointer rounded-[24px] transition ease-out" onClick={onClose}>
          <X  />
          </button>
          <h2 className="text-xl font-bold">Assign Courier</h2>
          <p className="text-gray-600">Select a courier for this order</p>
          
          <SearchableDropdown onSelect={(val) => setCourier(val)} />

          <div className="flex gap-3 justify-start w-full">
            <Button 
              onClick={handleCancel} 
              variant="secondary" 
              text="Cancel" 
            />
            <Button 
              onClick={handleCourierConfirm} 
              variant="primary" 
              text="Confirm" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
