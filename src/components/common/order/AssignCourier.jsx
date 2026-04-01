import Button from "./Button";
import SearchableDropdown from "../SearchableDropdown";
import useOrderStore from "../../../store/admin/useOrderStore";
import toast from "react-hot-toast";
import { LuX } from "react-icons/lu";
import { useLockBodyScroll } from "../../../hooks/useLockBodyScroll";
import { useTranslation } from "react-i18next";

export default function AssignCourier({ onClose, isOpen, orderId }) {
  const selectedCourier = useOrderStore((state) => state.selectedCourier);
  const setCourier = useOrderStore((state) => state.setCourier);
  const clearCourier = useOrderStore((state) => state.clearCourier);
  const {t} = useTranslation()
  if (!isOpen) return null;

  const handleCourierConfirm = () => {
    if (!selectedCourier) {
      toast.error(t("Select a courier"));
      return;
    } 
    setCourier(selectedCourier, orderId)

    toast.success(t("Courier Added Successfully"));
    onClose();
  };

  const handleCancel = () => {
    clearCourier();
    onClose();
  };
    const items = [
      { id: 1, name: "Ali", value: "ali" },
      { id: 2, name: "Ahmad", value: "ahmad" },
      { id: 3, name: "Hamed", value: "hamed" },
      { id: 4, name: "Hassan", value: "hassan" },
      { id: 5, name: "Hussain", value: "hussain" },
    ];
    useLockBodyScroll(isOpen)
  return (
    <div className="fixed  overflow-hidden inset-0 z-[50] flex items-center justify-center p-4">
      <div className="absolute  inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={handleCancel} />
      <div className="bg-white w-full max-w-md rounded-[24px] shadow-xl z-10">
        <div className="p-6 flex w-full flex-col items-start gap-4">
          <button  className="self-end hover:bg-orange-600 hover:text-white p-2 cursor-pointer rounded-[24px] transition ease-out" onClick={onClose}>
          <LuX  />
          </button>
          <h2 className="text-xl font-bold">{t("Assign Courier")}</h2>
          <p className="text-gray-600">{t("Select courier")}</p>
          
          <SearchableDropdown onSelect={(val) => setCourier(val)} items={items} />

          <div className="flex gap-3 justify-start w-full">
            <Button 
              onClick={handleCancel} 
              variant="secondary" 
              text={t("Cancel")} 
            />
            <Button 
              onClick={handleCourierConfirm} 
              variant="primary" 
              text={t("Confirm")} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
