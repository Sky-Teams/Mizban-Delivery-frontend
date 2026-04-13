import Button from "./Button";
import SearchableDropdown from "../SearchableDropdown";
import useOrderStore from "../../../store/admin/useOrderStore";
import toast from "react-hot-toast";
import { LuX } from "react-icons/lu";
import { useLockBodyScroll } from "../../../hooks/useLockBodyScroll";
import { useTranslation } from "react-i18next";
import { useCourierStore } from "../../../store/useCourierStore";
import { useEffect, useState } from "react";

export default function AssignCourier({ onClose, isOpen, orderId }) {
  const selectedCourier = useOrderStore((state) => state.selectedCourier);
  const assignDriverToOrder = useOrderStore((state) => state.assignDriverToOrder);
  const clearCourier = useOrderStore((state) => state.clearCourier);
  const couriers = useCourierStore((state)=> state.couriers)
  const [courier, setCourier] = useState("")
  const [driverDetails, setDriverDetails] = useState("")
  const {t} = useTranslation()
  if (!isOpen) return null;

  const handleCourierConfirm = () => {
    if (!courier) {
      toast.error(t("Select a courier"));
      return;
    } 
    assignDriverToOrder(orderId, driverDetails._id)
    onClose();
  };

  const handleCancel = () => {
    clearCourier();
    onClose();
  };
    useLockBodyScroll(isOpen)

  return (
    <div className="fixed  overflow-hidden inset-0 z-[50] flex items-center justify-center p-4">
      <div className="absolute  inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={handleCancel} />
      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl z-10">
        <div className="p-6 flex w-full flex-col items-start gap-4">
          <button  className="self-end hover:bg-orange-600 hover:text-white p-2 cursor-pointer rounded-[24px] transition ease-out" onClick={onClose}>
          <LuX  />
          </button>
          <h2 className="text-xl font-bold">{t("Assign Courier")}</h2>
          <p className="text-gray-600">{t("Select courier")}</p>
          
          <SearchableDropdown onSelect={(val) => setCourier(val)} drivers={couriers} getDriverDetails={(id)=> setDriverDetails(id)}/>

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
